import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useMounted, isHiddenElement } from '@vexip-ui/mixins'
import { multipleFixed, boundRange } from '@vexip-ui/utils'
import { animateScrollTo } from './helper'

import type { Ref } from 'vue'
import type { ScrollMode } from '@/components/scroll'

export function useScrollWrapper({
  mode,
  disabled,
  appear,
  scrollX,
  scrollY,
  onResize,
  onBeforeRefresh,
  onAfterRefresh
}: {
  mode: Ref<ScrollMode>,
  disabled: Ref<boolean>,
  appear: Ref<boolean>,
  width: Ref<number | string>,
  height: Ref<number | string>,
  scrollX: Ref<number>,
  scrollY: Ref<number>,
  onResize?: (entity: ResizeObserverEntry) => void,
  onBeforeRefresh?: () => void,
  onAfterRefresh?: () => void
}) {
  const contentElement = ref<HTMLElement | null>(null)

  const content = reactive({
    el: contentElement,
    scrollWidth: 0,
    offsetWidth: 0,
    scrollHeight: 0,
    offsetHeight: 0
  })

  const xScrollLimit = computed(() => {
    return content.el ? content.scrollWidth - content.offsetWidth : 0
  })
  const yScrollLimit = computed(() => {
    return content.el ? content.scrollHeight - content.offsetHeight : 0
  })
  const enableXScroll = computed(() => {
    return (
      !disabled.value &&
      mode.value !== 'vertical' &&
      !!content.el &&
      content.scrollWidth > content.offsetWidth
    )
  })
  const enableYScroll = computed(() => {
    return (
      !disabled.value &&
      mode.value !== 'horizontal' &&
      !!content.el &&
      content.scrollHeight > content.offsetHeight
    )
  })
  const xBarLength = computed(() => {
    if (content.el) {
      return boundRange((content.offsetWidth / (content.scrollWidth || 1)) * 100, 5, 99)
    }

    return 35
  })
  const yBarLength = computed(() => {
    if (content.el) {
      return boundRange((content.offsetHeight / (content.scrollHeight || 1)) * 100, 5, 99)
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

  // 当前滚动位置
  const currentScroll = reactive({
    x: 0,
    y: 0
  })

  function setScrollX(value: number) {
    currentScroll.x = boundRange(value, 0, xScrollLimit.value)

    if (content.el) {
      content.el.scrollLeft = currentScroll.x
    }
  }

  function setScrollY(value: number) {
    currentScroll.y = boundRange(value, 0, yScrollLimit.value)

    if (content.el) {
      content.el.scrollTop = currentScroll.y
    }
  }

  const percentX = ref(0)
  const percentY = ref(0)

  const { isMounted } = useMounted()

  function computeContentSize() {
    if (!content.el || isHiddenElement(content.el)) return

    content.scrollWidth = content.el.scrollWidth
    content.offsetWidth = content.el.offsetWidth
    content.scrollHeight = content.el.scrollHeight
    content.offsetHeight = content.el.offsetHeight

    if (mode.value !== 'vertical') {
      setScrollX(!isMounted.value && appear.value ? scrollX.value : currentScroll.x || 0)
    }

    if (mode.value !== 'horizontal') {
      setScrollY(!isMounted.value && appear.value ? scrollY.value : currentScroll.y || 0)
    }

    computePercent()
  }

  function computePercent() {
    if (content.el) {
      percentX.value = multipleFixed(currentScroll.x / (xScrollLimit.value || 1), 100, 2)
      percentY.value = multipleFixed(currentScroll.y / (yScrollLimit.value || 1), 100, 2)
    }
  }

  function handleResize(entity: ResizeObserverEntry) {
    refresh()
    onResize?.(entity)
  }

  onMounted(() => {
    refresh()

    if (appear.value) {
      scrollTo(scrollX.value, scrollY.value)
    }
  })

  function refresh() {
    if (typeof onBeforeRefresh === 'function') {
      onBeforeRefresh()
    }

    computeContentSize()
    setTimeout(() => {
      if (typeof onAfterRefresh === 'function') {
        onAfterRefresh()
      }
    }, 0)
  }

  function scrollTo(clientX: number, clientY: number, duration?: number) {
    return new Promise<void>(resolve => {
      if (!content.el) return

      if (!enableXScroll.value || Math.abs(currentScroll.x - clientX) < 0.01) {
        clientX = currentScroll.x
      }

      if (!enableYScroll.value || Math.abs(currentScroll.y - clientY) < 0.01) {
        clientY = currentScroll.y
      }

      animateScrollTo({
        duration,
        el: content.el,
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
    if (!content.el) return Promise.resolve()

    if (typeof el === 'string') {
      el = content.el.querySelector(el)!
    }

    if (!(el instanceof Node)) return Promise.resolve()

    const wrapperRect = content.el.getBoundingClientRect()
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

    handleResize,
    setScrollX,
    setScrollY,
    computePercent,
    refresh,
    scrollTo,
    scrollBy,
    scrollToElement
  }
}
