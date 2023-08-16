import { computed, nextTick, onBeforeUnmount, onMounted, ref, unref } from 'vue'

import { createBITree, isDefined, nextFrameOnce } from '@vexip-ui/utils'
import { isHiddenElement } from './display'
import { observeResize, unobserveResize } from './resize'

import type { MaybeRef } from 'vue'

type Key = number | string | symbol
type Data = Record<string, any>
type Behavior = ScrollToOptions['behavior']

export interface VirtualOptions<T extends Data> {
  /**
   * 虚拟滚动的元素
   */
  items: MaybeRef<T[]>,
  /**
   * 设置元素的最小高度
   */
  itemSize: MaybeRef<number>,
  /**
   * 设置元素是否为固定高度，固定高度时不处理 resize
   */
  itemFixed: MaybeRef<boolean>,
  /**
   * 元素的主键
   */
  idKey: MaybeRef<keyof T>,
  /**
   * 默认停留在的元素的主键，未实现
   */
  defaultKeyAt?: Key,
  /**
   * 设置前后的缓冲元素的个数
   */
  bufferSize?: MaybeRef<number>,
  /**
   * 虚拟滚动的包围元素
   */
  wrapper?: MaybeRef<HTMLElement | null | undefined>,
  /**
   * 是否自动观察 wrapper 缩放
   *
   * @default true
   */
  autoResize?: boolean
}

export function useVirtual<T extends Data = Data>(options: VirtualOptions<T>) {
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
    const itemList = unref(items)
    const length = itemList.length
    const keyField = unref(idKey)
    const map = new Map<Key, number>()

    for (let i = 0; i < length; ++i) {
      map.set(itemList[i][keyField], i)
    }

    return map
  })
  const visibleHeight = ref(0)
  const heightDiffMap = new Map<Key, number>()
  const heightTree = computed(() => {
    const itemList = unref(items)
    const length = itemList.length
    const keyField = unref(idKey)
    const tree = createBITree(length, unref(itemSize))

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
      heightTree.value.boundIndex(scrollOffset.value) - Math.max(unref(bufferSize), 0),
      0
    )
  })
  const visibleItems = computed(() => {
    if (!visibleHeight.value || visibleHeight.value < 0) return []

    const unrefItems = unref(items)
    const endIndex = Math.min(
      heightTree.value.boundIndex(scrollOffset.value + visibleHeight.value) +
        1 +
        Math.max(unref(bufferSize), 0),
      unrefItems.length
    )

    return unrefItems.slice(startIndex.value, endIndex)
  })
  const listStyle = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    treeUpdateDep.value

    const height = heightTree.value.sum()
    const fixed = unref(itemFixed)

    return {
      height: fixed ? `${height}px` : undefined,
      minHeight: fixed ? undefined : `${height}px`,
      boxSizing: 'content-box'
    } as const
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
      const wrapperEl = unref(wrapper)

      if (autoResize && wrapperEl) {
        observeResize(wrapperEl, handleResize)
      }

      if (isDefined(defaultKeyAt)) {
        scrollToKey(defaultKeyAt)
      }
    })
  })

  if (autoResize) {
    onBeforeUnmount(() => {
      const wrapperEl = unref(wrapper)

      wrapperEl && unobserveResize(wrapperEl)
    })
  }

  function syncScrollOffset() {
    const wrapperEl = unref(wrapper)

    if (wrapperEl) {
      scrollOffset.value = wrapperEl.scrollTop
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
    if (unref(itemFixed)) return

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

    const diff = height - unref(itemSize)
    const delta = height - prevHeight

    if (diff) {
      heightDiffMap.set(key, diff)
    } else {
      heightDiffMap.delete(key)
    }

    if (!delta) return

    tree.add(index, delta)
    treeUpdateDep.value++

    const wrapperEl = unref(wrapper)

    if (wrapperEl) {
      const prevTop = tree.sum(index)

      if (wrapperEl.scrollTop > prevTop) {
        wrapperEl.scrollBy(0, delta)
      }

      scrollOffset.value = wrapperEl.scrollTop
    }
  }

  function scrollTo(top: number, behavior?: Behavior) {
    const wrapperEl = unref(wrapper)

    if (wrapperEl) {
      wrapperEl.scrollTo({
        behavior,
        top,
        left: 0
      })
    }
  }

  function scrollBy(delta: number, behavior?: Behavior) {
    const wrapperEl = unref(wrapper)

    if (wrapperEl) {
      wrapperEl.scrollBy({
        behavior,
        top: delta,
        left: 0
      })
    }
  }

  function scrollToKey(key: Key, behavior?: Behavior) {
    const index = indexMap.value.get(key)

    if (index != null) {
      scrollToIndex(index, behavior)
    }
  }

  function scrollToIndex(index: number, behavior?: Behavior) {
    const wrapperEl = unref(wrapper)

    if (wrapperEl) {
      wrapperEl.scrollTo({
        behavior,
        top: heightTree.value.sum(index),
        left: 0
      })
    }
  }

  function ensureIndexInView(index: number, behavior?: Behavior) {
    const wrapperEl = unref(wrapper)

    if (!wrapperEl) return

    const tree = heightTree.value
    const viewTop = wrapperEl.scrollTop
    const top = tree.sum(index)

    if (top < viewTop) {
      scrollToIndex(index, behavior)
      return
    }

    const viewHeight = wrapperEl.offsetHeight
    const viewBottom = viewTop + viewHeight
    const bottom = tree.sum(index + 1)

    if (bottom > viewBottom) {
      scrollTo(bottom - viewHeight, behavior)
    }
  }

  function ensureKeyInView(key: Key, behavior?: Behavior) {
    const index = indexMap.value.get(key)

    if (index != null) {
      ensureIndexInView(index, behavior)
    }
  }

  return {
    wrapper,
    indexMap,
    heightTree,
    startIndex,
    scrollOffset,
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
