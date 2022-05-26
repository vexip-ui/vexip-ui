import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ResizeObserver } from '@juggle/resize-observer'
import { createBITree, nextFrameOnce } from '@vexip-ui/utils'
import { queryOutsideHiddenElement } from './display'

import type { Ref } from 'vue'

type Key = number | string | symbol
type ResizeHandler = (entry: ResizeObserverEntry) => any

export interface VirtualOptions {
  items: Ref<Record<string, any>>,
  itemSize: Ref<number>,
  itemFixed: Ref<boolean>,
  idKey: Ref<string>,
  defaultKeyAt: Ref<Key>,
  bufferSize?: Ref<number>,
  wrapper?: Ref<HTMLElement | null>,
  onResize?: ResizeHandler,
  onScroll?: (event: Event) => void
}

const handlerMap = new WeakMap<Element, ResizeHandler>()

function handleResize(entries: ResizeObserverEntry[]) {
  for (let i = 0, len = entries.length; i < len; ++i) {
    const entry = entries[i]
    const handler = handlerMap.get(entry.target)

    if (typeof handler === 'function') {
      handler(entry)
    }
  }
}

const resizeObserver = new (window.ResizeObserver || ResizeObserver)(handleResize)

function observeResize(el: Element, handler: ResizeHandler) {
  handlerMap.set(el, handler)
  resizeObserver.observe(el)
}

function unobserveResize(el: Element) {
  if (handlerMap.has(el)) {
    resizeObserver.unobserve(el)
    handlerMap.delete(el)
  }
}

export function useVirtual(options: VirtualOptions) {
  const {
    items,
    itemSize,
    itemFixed,
    idKey,
    // defaultKeyAt,
    bufferSize = ref(5),
    wrapper = ref(null),
    onResize,
    onScroll
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

    const buffer = Math.max(bufferSize.value, 0)
    const endIndex = Math.min(
      startIndex.value + Math.ceil(visibleHeight.value / itemSize.value + 1) + buffer * 2,
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

  function handleScroll(event: Event) {
    nextFrameOnce(syncScrollOffset)
    typeof onScroll === 'function' && onScroll(event)
  }

  function handleResize(entry: ResizeObserverEntry) {
    if (isHiddenElement(entry.target as HTMLElement) || entry.contentRect.height === visibleHeight.value) {
      return
    }

    visibleHeight.value = entry.contentRect.height
    typeof onResize === 'function' && onResize(entry)
  }

  function handleItemResize(key: Key, entry: ResizeObserverEntry) {
    if (itemFixed.value || isHiddenElement(entry.target as HTMLElement)) return

    const index = indexMap.value.get(key)!
    const prevHeight = heightTree.value.get(index)
    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height

    if (height === prevHeight) return

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
    visibleItems,
    listStyle,
    itemsStyle,
    handleScroll,
    handleResize,
    handleItemResize
  }
}

function isHiddenElement(el: HTMLElement | null) {
  if (el?.style.display !== 'none') {
    return !!queryOutsideHiddenElement(el)
  }

  return true
}
