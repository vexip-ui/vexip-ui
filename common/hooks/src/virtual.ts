import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { createBITree, isDefined, nextFrameOnce } from '@vexip-ui/utils'
import { isHiddenElement } from './display'
import { observeResize, unobserveResize } from './resize'

import type { Ref } from 'vue'
// import type { ResizeHandler } from './resize'

type Key = number | string | symbol
type Behavior = ScrollToOptions['behavior']

export interface VirtualOptions {
  /**
   * 虚拟滚动的元素
   */
  items: Ref<Array<Record<string, any>>>,
  /**
   * 设置元素的最小高度
   */
  itemSize: Ref<number>,
  /**
   * 设置元素是否为固定高度，固定高度时不处理 resize
   */
  itemFixed: Ref<boolean>,
  /**
   * 元素的主键
   */
  idKey: Ref<string>,
  /**
   * 默认停留在的元素的主键，未实现
   */
  defaultKeyAt?: Key,
  /**
   * 设置前后的缓冲元素的个数
   */
  bufferSize?: Ref<number>,
  /**
   * 虚拟滚动的包围元素
   */
  wrapper?: Ref<HTMLElement | null | undefined>,
  /**
   * 是否自动观察 wrapper 缩放
   *
   * @default true
   */
  autoResize?: boolean
}

export function useVirtual(options: VirtualOptions) {
  const {
    items,
    itemSize,
    itemFixed,
    idKey,
    defaultKeyAt,
    bufferSize = ref(5),
    wrapper = ref(null),
    autoResize = true
  } = options

  const indexMap = computed(() => {
    const itemList = items.value
    const length = itemList.length
    const keyField = idKey.value
    const map = new Map<Key, number>()

    for (let i = 0; i < length; ++i) {
      map.set(itemList[i][keyField], i)
    }

    return map
  })
  const visibleHeight = ref(0)
  const heightDiffMap = new Map<Key, number>()
  const heightTree = computed(() => {
    const itemList = items.value
    const length = itemList.length
    const keyField = idKey.value
    const tree = createBITree(length, itemSize.value)

    for (let i = 0; i < length; ++i) {
      const key = itemList[i][keyField]
      const heightDiff = heightDiffMap.get(key)

      if (heightDiff) {
        tree.add(i, heightDiff)
      }
    }

    return tree
  })
  const treeUpdateDep = ref(0)
  const scrollOffset = ref(0)
  const startIndex = computed(() => {
    return Math.max(
      heightTree.value.boundIndex(scrollOffset.value) - Math.max(bufferSize.value, 0),
      0
    )
  })
  const visibleItems = computed(() => {
    if (!visibleHeight.value || visibleHeight.value < 0) return []

    const endIndex = Math.min(
      heightTree.value.boundIndex(scrollOffset.value + visibleHeight.value) +
        1 +
        Math.max(bufferSize.value, 0),
      items.value.length
    )

    return items.value.slice(startIndex.value, endIndex)
  })
  const listStyle = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    treeUpdateDep.value

    const height = heightTree.value.sum()

    return {
      height: itemFixed.value ? `${height}px` : undefined,
      minHeight: itemFixed.value ? undefined : `${height}px`,
      boxSizing: 'content-box'
    }
  })
  const itemsStyle = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    treeUpdateDep.value

    return {
      transform: `translate3d(0, ${heightTree.value.sum(startIndex.value)}px, 0)`
    }
  })

  onMounted(() => {
    nextTick(() => {
      if (autoResize && wrapper.value) {
        observeResize(wrapper.value, handleResize)
      }

      if (isDefined(defaultKeyAt)) {
        scrollToKey(defaultKeyAt)
      }
    })
  })

  if (autoResize) {
    onBeforeUnmount(() => {
      wrapper.value && unobserveResize(wrapper.value)
    })
  }

  function syncScrollOffset() {
    if (wrapper.value) {
      scrollOffset.value = wrapper.value.scrollTop
    }
  }

  function handleScroll() {
    nextFrameOnce(syncScrollOffset)
  }

  function handleResize(entry: ResizeObserverEntry) {
    if (
      isHiddenElement(entry.target as HTMLElement) ||
      entry.contentRect.height === visibleHeight.value
    ) {
      return
    }

    visibleHeight.value = entry.contentRect.height
  }

  function handleItemResize(key: Key, entry: ResizeObserverEntry) {
    if (itemFixed.value) return

    const index = indexMap.value.get(key)!
    const tree = heightTree.value
    const prevHeight = tree.get(index)
    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height

    if (height === prevHeight) return

    if (isHiddenElement(entry.target as HTMLElement)) {
      if (prevHeight) {
        tree.add(index, -prevHeight)
        treeUpdateDep.value++
      }

      return
    }

    const diff = height - itemSize.value
    const delta = height - prevHeight

    if (diff) {
      heightDiffMap.set(key, diff)
    } else {
      heightDiffMap.delete(key)
    }

    if (!delta) return

    tree.add(index, delta)
    treeUpdateDep.value++

    if (wrapper.value) {
      const prevTop = tree.sum(index)

      if (wrapper.value.scrollTop > prevTop) {
        wrapper.value.scrollBy(0, delta)
      }

      scrollOffset.value = wrapper.value.scrollTop
    }
  }

  function scrollTo(top: number, behavior?: Behavior) {
    if (wrapper.value) {
      wrapper.value.scrollTo({
        behavior,
        top,
        left: 0
      })
    }
  }

  function scrollBy(delta: number, behavior?: Behavior) {
    if (wrapper.value) {
      wrapper.value.scrollBy({
        behavior,
        top: delta,
        left: 0
      })
    }
  }

  function scrollToKey(key: Key, behavior?: Behavior) {
    const index = indexMap.value.get(key)

    if (index !== undefined) {
      scrollToIndex(index, behavior)
    }
  }

  function scrollToIndex(index: number, behavior?: Behavior) {
    if (wrapper.value) {
      wrapper.value.scrollTo({
        behavior,
        top: heightTree.value.sum(index),
        left: 0
      })
    }
  }

  function ensureIndexInView(index: number, behavior?: Behavior) {
    if (!wrapper.value) return

    const tree = heightTree.value
    const viewTop = wrapper.value.scrollTop
    const top = tree.sum(index)

    if (top < viewTop) {
      scrollToIndex(index, behavior)
      return
    }

    const viewHeight = wrapper.value.offsetHeight
    const viewBottom = viewTop + viewHeight
    const bottom = tree.sum(index + 1)

    if (bottom > viewBottom) {
      scrollTo(bottom - viewHeight, behavior)
    }
  }

  function ensureKeyInView(key: Key, behavior?: Behavior) {
    const index = indexMap.value.get(key)

    if (index !== undefined) {
      ensureIndexInView(index, behavior)
    }
  }

  return {
    wrapper,
    scrollOffset,
    indexMap,
    visibleItems,
    listStyle,
    itemsStyle,
    handleScroll,
    handleResize,
    handleItemResize,
    scrollTo,
    scrollBy,
    scrollToKey,
    scrollToIndex,
    ensureIndexInView,
    ensureKeyInView
  }
}
