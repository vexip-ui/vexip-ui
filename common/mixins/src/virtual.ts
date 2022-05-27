import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { createBITree, nextFrameOnce } from '@vexip-ui/utils'
import { isHiddenElement } from './display'
import { observeResize, unobserveResize } from './resize'

import type { Ref } from 'vue'
// import type { ResizeHandler } from './resize'

type Key = number | string | symbol

export interface VirtualOptions {
  items: Ref<Array<Record<string, any>>>,
  itemSize: Ref<number>,
  itemFixed: Ref<boolean>,
  idKey: Ref<string>,
  defaultKeyAt?: Ref<Key>,
  bufferSize?: Ref<number>,
  wrapper?: Ref<HTMLElement | null>
  // onResize?: ResizeHandler,
  // onScroll?: (event: Event) => void
}

export function useVirtual(options: VirtualOptions) {
  const {
    items,
    itemSize,
    itemFixed,
    idKey,
    // defaultKeyAt,
    bufferSize = ref(5),
    wrapper = ref(null)
    // onResize,
    // onScroll
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
      heightTree.value.boundIndex(scrollOffset.value + visibleHeight.value) + 1 + Math.max(bufferSize.value, 0),
      items.value.length
    )

    return items.value.slice(startIndex.value, endIndex)
  })
  const listStyle = computed(() => {
    // eslint-disable-next-line no-unused-expressions
    treeUpdateDep.value

    const height = heightTree.value.sum()

    return {
      height: itemFixed.value ? `${height}px` : undefined,
      minHeight: itemFixed.value ? undefined : `${height}px`,
      boxSizing: 'content-box'
    }
  })
  const itemsStyle = computed(() => {
    // eslint-disable-next-line no-unused-expressions
    treeUpdateDep.value

    return {
      transform: `translate3d(0, ${heightTree.value.sum(startIndex.value)}px, 0)`
    }
  })

  onMounted(() => {
    nextTick(() => {
      if (wrapper.value) {
        observeResize(wrapper.value, handleResize)
      }
    })
  })

  onBeforeUnmount(() => {
    wrapper.value && unobserveResize(wrapper.value)
  })

  function syncScrollOffset() {
    if (wrapper.value) {
      scrollOffset.value = wrapper.value.scrollTop
    }
  }

  function handleScroll() {
    nextFrameOnce(syncScrollOffset)
    // typeof onScroll === 'function' && onScroll(event)
  }

  function handleResize(entry: ResizeObserverEntry) {
    if (isHiddenElement(entry.target as HTMLElement) || entry.contentRect.height === visibleHeight.value) {
      return
    }

    visibleHeight.value = entry.contentRect.height
    // typeof onResize === 'function' && onResize(entry)
  }

  function handleItemResize(key: Key, entry: ResizeObserverEntry) {
    if (itemFixed.value) return

    const index = indexMap.value.get(key)!
    const prevHeight = heightTree.value.get(index)
    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height

    if (height === prevHeight) return

    if (isHiddenElement(entry.target as HTMLElement)) {
      if (prevHeight) {
        heightTree.value.add(index, -1 * prevHeight)
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

    heightTree.value.add(index, delta)
    treeUpdateDep.value++
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
    handleItemResize
  }
}
