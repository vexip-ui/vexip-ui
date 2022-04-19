import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { throttle, debounce } from '@/common/utils/performance'
import { multipleFixed, boundRange } from '@/common/utils/number'
import { animateScrollTo } from './helper'

import type { Ref } from 'vue'
import type { ScrollMode } from './symbol'

export function useScrollWrapper({
  mode,
  disabled,
  appear,
  scrollX,
  scrollY,
  beforeRefresh,
  afterRefresh
}: {
  mode: Ref<ScrollMode>,
  disabled: Ref<boolean>,
  appear: Ref<boolean>,
  width: Ref<number | string>,
  height: Ref<number | string>,
  scrollX: Ref<number>,
  scrollY: Ref<number>,
  beforeRefresh?: () => void,
  afterRefresh?: () => void
}) {
  const contentElement = ref<HTMLElement | null>(null)

  const xScrollLimit = computed(() => {
    return contentElement.value
      ? contentElement.value.scrollWidth - contentElement.value.offsetWidth
      : 0
  })
  const yScrollLimit = computed(() => {
    return contentElement.value
      ? contentElement.value.scrollHeight - contentElement.value.offsetHeight
      : 0
  })
  const enableXScroll = computed(() => {
    return !disabled.value && mode.value !== 'vertical' && !!contentElement.value
  })
  const enableYScroll = computed(() => {
    return !disabled.value && mode.value !== 'horizontal' && !!contentElement.value
  })
  const xBarLength = computed(() => {
    if (contentElement.value) {
      return boundRange(
        (contentElement.value.offsetWidth / (contentElement.value.scrollWidth || 1)) * 100,
        5,
        99
      )
    }

    return 35
  })
  const yBarLength = computed(() => {
    if (contentElement.value) {
      return boundRange(
        (contentElement.value.offsetHeight / (contentElement.value.scrollHeight || 1)) * 100,
        5,
        99
      )
    }

    return 35
  })

  watch(contentElement, () => {
    computeContentSize()
  })
  watch(scrollX, value => {
    setScrollX(value)
  })
  watch(scrollY, value => {
    setScrollY(value)
  })

  // const isReady = ref(false)

  // 当前滚动位置
  const currentScroll = reactive({
    x: 0,
    y: 0
  })

  function setScrollX(value: number) {
    currentScroll.x = boundRange(value, 0, xScrollLimit.value)

    if (contentElement.value) {
      contentElement.value.scrollLeft = currentScroll.x
    }
  }

  function setScrollY(value: number) {
    currentScroll.y = boundRange(value, 0, yScrollLimit.value)

    if (contentElement.value) {
      contentElement.value.scrollTop = currentScroll.y
    }
  }

  const percentX = ref(0)
  const percentY = ref(0)

  let isMounted = false

  function computeContentSize() {
    if (!contentElement.value) return

    if (mode.value !== 'vertical') {
      setScrollX(!isMounted && appear.value ? scrollX.value : currentScroll.x)
    }

    if (mode.value !== 'horizontal') {
      setScrollY(!isMounted && appear.value ? scrollY.value : currentScroll.y)
    }

    computePercent()
  }

  function computePercent() {
    if (contentElement.value) {
      percentX.value = multipleFixed(currentScroll.x / (xScrollLimit.value || 1), 100, 2)
      percentY.value = multipleFixed(currentScroll.y / (yScrollLimit.value || 1), 100, 2)
    }
  }

  const handleResize = throttle(refresh)

  onMounted(() => {
    refresh()
    window.addEventListener('resize', handleResize)

    isMounted = true

    if (appear.value) {
      scrollTo(scrollX.value, scrollY.value)
    }
  })

  onBeforeUnmount(() => {
    destroyMutationObserver()
    window.removeEventListener('resize', handleResize)

    isMounted = false
  })

  let mutationObserver: MutationObserver | null

  function createMutationObserver() {
    const target = contentElement.value?.children[0]

    if (!target) return

    mutationObserver = new MutationObserver(debounce(computeContentSize))

    mutationObserver.observe(target, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
      attributeFilter: ['style']
    })
  }

  function destroyMutationObserver() {
    if (mutationObserver) {
      mutationObserver.disconnect()
      mutationObserver = null
    }
  }

  function refresh() {
    if (typeof beforeRefresh === 'function') {
      beforeRefresh()
    }

    computeContentSize()

    nextTick(() => {
      destroyMutationObserver()
      createMutationObserver()
    })

    window.setTimeout(() => {
      if (typeof afterRefresh === 'function') {
        afterRefresh()
      }
    }, 0)
  }

  function scrollTo(clientX: number, clientY: number, duration?: number) {
    return new Promise<void>(resolve => {
      if (!contentElement.value) return

      if (!enableXScroll.value || Math.abs(currentScroll.x - clientX) < 0.01) {
        clientX = currentScroll.x
      }

      if (!enableYScroll.value || Math.abs(currentScroll.y - clientY) < 0.01) {
        clientY = currentScroll.y
      }

      animateScrollTo({
        duration,
        el: contentElement.value,
        xFrom: currentScroll.x,
        xTo: boundRange(clientX, 0, xScrollLimit.value),
        yFrom: currentScroll.y,
        yTo: boundRange(clientY, 0, yScrollLimit.value),
        callback: resolve
      })
    })
  }

  function scrollBy(deltaX: number, deltaY: number, duration?: number) {
    return scrollTo(currentScroll.x + deltaX, currentScroll.y + deltaY, duration)
  }

  function scrollToElement(el: string | Element, duration?: number, offset = 0) {
    if (!contentElement.value) return Promise.resolve()

    if (typeof el === 'string') {
      el = contentElement.value.querySelector(el)!
    }

    if (!(el instanceof Node)) return Promise.resolve()

    const wrapperRect = contentElement.value.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    let clientX = 0
    let clientY = 0

    if (mode.value !== 'vertical') {
      clientX = elRect.left - wrapperRect.left + offset
    }

    if (mode.value !== 'horizontal') {
      clientY = elRect.top - wrapperRect.top + offset
    }

    return scrollTo(clientX, clientY, duration)
  }

  return {
    contentElement,

    currentScroll,
    percentX,
    percentY,
    xScrollLimit,
    yScrollLimit,
    enableXScroll,
    enableYScroll,
    xBarLength,
    yBarLength,

    setScrollX,
    setScrollY,
    computePercent,
    refresh,
    scrollTo,
    scrollBy,
    scrollToElement
  }
}
