import { computed, onMounted, reactive, ref, watch } from 'vue'

import { isHiddenElement, useManualRef, useMounted } from '@vexip-ui/hooks'
import { boundRange, debounce, debounceMinor, isElement, multipleFixed } from '@vexip-ui/utils'
import { animateScrollTo } from './helper'

import type { Ref } from 'vue'
import type { NativeScrollMode } from './symbol'

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
  mode: Ref<NativeScrollMode>,
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
  const { manualRef, triggerUpdate } = useManualRef()

  const contentElement = ref<HTMLElement>()

  const content = reactive({
    el: contentElement,
    scrollWidth: 0,
    offsetWidth: 0,
    scrollHeight: 0,
    offsetHeight: 0
  })

  // 当前滚动位置
  const x = manualRef(0)
  const y = manualRef(0)

  const percentX = manualRef(0)
  const percentY = manualRef(0)

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

  function setScrollX(value: number) {
    x.value = boundRange(value, 0, xScrollLimit.value)

    if (content.el) {
      content.el.scrollLeft = x.value
    }
  }

  function setScrollY(value: number) {
    y.value = boundRange(value, 0, yScrollLimit.value)

    if (content.el) {
      content.el.scrollTop = y.value
    }
  }

  const { isMounted } = useMounted()

  function computeContentSize() {
    if (!content.el || isHiddenElement(content.el)) return

    console.log({
      osh: content.scrollHeight,
      ooh: content.offsetHeight,
      sh: content.el.scrollHeight,
      oh: content.el.offsetHeight
    })
    content.scrollWidth = content.el.scrollWidth
    content.offsetWidth = content.el.offsetWidth
    content.scrollHeight = content.el.scrollHeight
    content.offsetHeight = content.el.offsetHeight

    if (mode.value !== 'vertical') {
      setScrollX(!isMounted.value && appear.value ? scrollX.value : x.value || 0)
    }

    if (mode.value !== 'horizontal') {
      setScrollY(!isMounted.value && appear.value ? scrollY.value : y.value || 0)
    }

    computePercent()
    triggerUpdate()
  }

  function computePercent() {
    if (content.el) {
      percentX.value = multipleFixed(x.value / (xScrollLimit.value || 1), 100, 2)
      percentY.value = multipleFixed(y.value / (yScrollLimit.value || 1), 100, 2)
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

  const refresh = debounceMinor(() => {
    if (typeof onBeforeRefresh === 'function') {
      onBeforeRefresh()
    }

    computeContentSize()
    setTimeout(() => {
      if (typeof onAfterRefresh === 'function') {
        onAfterRefresh()
      }
    }, 0)
  })

  function scrollTo(clientX: number, clientY: number, duration = 500) {
    return new Promise<void>(resolve => {
      if (!content.el) return

      if (!enableXScroll.value || Math.abs(x.value - clientX) < 0.01) {
        clientX = x.value
      }

      if (!enableYScroll.value || Math.abs(y.value - clientY) < 0.01) {
        clientY = y.value
      }

      animateScrollTo({
        duration,
        el: content.el,
        xFrom: x.value,
        xTo: boundRange(clientX, 0, xScrollLimit.value),
        yFrom: y.value,
        yTo: boundRange(clientY, 0, yScrollLimit.value),
        callback: resolve
      })
    })
  }

  function scrollBy(deltaX: number, deltaY: number, duration = 500) {
    return scrollTo(x.value + deltaX, y.value + deltaY, duration)
  }

  function scrollToElement(el: string | Element, duration?: number, offset = 0) {
    if (!content.el) return Promise.resolve()

    if (typeof el === 'string') {
      el = content.el.querySelector(el)!
    }

    if (!isElement(el)) return Promise.resolve()

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

    content,
    x,
    y,
    percentX,
    percentY,
    xScrollLimit,
    yScrollLimit,
    enableXScroll,
    enableYScroll,
    xBarLength,
    yBarLength,

    handleResize: debounce(handleResize),
    setScrollX,
    setScrollY,
    computePercent,
    refresh,
    scrollTo,
    scrollBy,
    scrollToElement,
    triggerUpdate
  }
}
