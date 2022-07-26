import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { toNumber, multipleFixed } from '@vexip-ui/utils'

import type { Ref } from 'vue'
import type { ScrollMode } from './symbol'

export function useScrollWrapper({
  mode,
  disabled,
  width,
  height,
  scrollX,
  scrollY,
  onResize,
  onBeforeRefresh,
  onAfterRefresh
}: {
  mode: Ref<ScrollMode>,
  disabled: Ref<boolean>,
  width: Ref<number | string>,
  height: Ref<number | string>,
  scrollX: Ref<number>,
  scrollY: Ref<number>,
  onResize?: (entry: ResizeObserverEntry) => void,
  onBeforeRefresh?: () => void,
  onAfterRefresh?: () => void
}) {
  const wrapperElement = ref<HTMLElement | null>(null)
  const contentElement = ref<HTMLElement | null>(null)

  // 容器长宽
  const wrapper = reactive({
    el: wrapperElement,
    width: toNumber(width.value),
    height: toNumber(height.value)
  })

  // 内容长宽
  const content = reactive({
    el: contentElement,
    width: 0,
    height: 0
  })

  const xScrollLimit = computed(() => {
    return wrapper.width ? wrapper.width - content.width : 0
  })
  const yScrollLimit = computed(() => {
    return wrapper.height ? wrapper.height - content.height : 0
  })
  const enableXScroll = computed(() => {
    return (
      !disabled.value &&
      mode.value !== 'vertical' &&
      !!wrapper.width &&
      content.width - wrapper.width > 1
    )
  })
  const enableYScroll = computed(() => {
    return (
      !disabled.value &&
      mode.value !== 'horizontal' &&
      !!wrapper.height &&
      content.height - wrapper.height > 1
    )
  })
  const xBarLength = computed(() => {
    if (wrapper.width) {
      return Math.max(Math.min((wrapper.width / (content.width || 1)) * 100, 99), 5)
    }

    return 35
  })
  const yBarLength = computed(() => {
    if (wrapper.height) {
      return Math.max(Math.min((wrapper.height / (content.height || 1)) * 100, 99), 5)
    }

    return 35
  })

  watch(wrapperElement, () => {
    refreshWrapper()
  })
  watch(contentElement, () => {
    computeContentSize()
  })
  watch(scrollX, value => {
    currentScroll.x = -value
    verifyScroll()
  })
  watch(scrollY, value => {
    currentScroll.y = -value
    verifyScroll()
  })
  watch(width, () => {
    refreshWrapper()
    verifyScroll()
  })
  watch(height, () => {
    refreshWrapper()
    verifyScroll()
  })

  function computeWrapperSize(sizeType: 'width' | 'height') {
    nextTick(() => {
      if (!wrapper.el) return

      const size = sizeType === 'width' ? width.value : height.value
      const titleCaseSizeType = sizeType.slice(0, 1).toUpperCase() + sizeType.slice(1)

      // 获取 wrapper 的 px 大小
      if (typeof size === 'string') {
        if (!size.endsWith('px') && Number.isNaN(Number(size))) {
          wrapper[sizeType] =
            wrapper.el[`offset${titleCaseSizeType}` as 'offsetWidth' | 'offsetHeight']
        } else {
          wrapper[sizeType] = parseInt(size)
        }
      } else {
        wrapper[sizeType] = size
      }
    })
  }

  function refreshWrapper() {
    if (mode.value !== 'vertical') {
      computeWrapperSize('width')
    }

    if (mode.value !== 'horizontal') {
      computeWrapperSize('height')
    }
  }

  const isReady = ref(false)

  // 当前滚动位置
  const currentScroll = reactive({
    x: -scrollX.value,
    y: -scrollY.value
  })

  const percentX = ref(0)
  const percentY = ref(0)

  let timer: number

  function computeContentSize() {
    window.clearTimeout(timer)

    timer = window.setTimeout(() => {
      if (!content.el) return

      if (mode.value !== 'vertical') {
        content.width = content.el.offsetWidth

        if (wrapper.width >= content.width) {
          currentScroll.x = 0
        } else {
          if (currentScroll.x === 0) {
            currentScroll.x = -scrollX.value
          }
        }
      }

      if (mode.value !== 'horizontal') {
        content.height = content.el.offsetHeight

        if (wrapper.height >= content.height) {
          currentScroll.y = 0
        } else {
          if (currentScroll.y === 0) {
            currentScroll.y = -scrollY.value
          }
        }
      }

      isReady.value = false

      window.setTimeout(() => {
        isReady.value = true
        verifyScroll()
      }, 1)
    }, 0)
  }

  /**
   * Will post process the percent scroll values.
   */
  function verifyScroll() {
    if (!isReady.value) {
      return
    }

    if (mode.value !== 'vertical') {
      currentScroll.x = Math.min(0, Math.max(currentScroll.x, xScrollLimit.value))
    }

    if (mode.value !== 'horizontal') {
      currentScroll.y = Math.min(0, Math.max(currentScroll.y, yScrollLimit.value))
    }

    computePercent()
  }

  function computePercent() {
    percentX.value = multipleFixed(currentScroll.x / (xScrollLimit.value || -1), 100, 2)
    percentY.value = multipleFixed(currentScroll.y / (yScrollLimit.value || -1), 100, 2)

    percentX.value = Math.max(0, Math.min(percentX.value, 100))
    percentY.value = Math.max(0, Math.min(percentY.value, 100))
  }

  function handleResize(entity: ResizeObserverEntry) {
    refresh()
    onResize?.(entity)
  }

  let isMounted = false

  onMounted(() => {
    refresh()
    isMounted = true
  })

  function refresh() {
    if (typeof onBeforeRefresh === 'function') {
      onBeforeRefresh()
    }

    computeContentSize()
    refreshWrapper()

    window.setTimeout(
      () => {
        verifyScroll()

        if (typeof onAfterRefresh === 'function') {
          onAfterRefresh()
        }
      },
      isMounted ? 20 : 100
    )
  }

  return {
    wrapperElement,
    contentElement,

    wrapper,
    isReady,
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
    verifyScroll,
    computePercent,
    refresh
  }
}
