import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

import { useManualRef } from '@vexip-ui/hooks'
import { multipleFixed, toNumber } from '@vexip-ui/utils'

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
  mode: Ref<Exclude<ScrollMode, 'horizontal-exact'>>,
  disabled: Ref<boolean>,
  width: Ref<number | string>,
  height: Ref<number | string>,
  scrollX: Ref<number>,
  scrollY: Ref<number>,
  onResize?: (entry: ResizeObserverEntry) => void,
  onBeforeRefresh?: () => void,
  onAfterRefresh?: () => void
}) {
  const { manualRef, triggerUpdate } = useManualRef()

  const wrapperEl = ref<HTMLElement>()
  const contentEl = ref<HTMLElement>()

  // 容器长宽
  const wrapper = reactive({
    el: wrapperEl,
    width: toNumber(width.value),
    height: toNumber(height.value)
  })

  // 内容长宽
  const content = reactive({
    el: contentEl,
    width: 0,
    height: 0
  })

  const x = manualRef(0)
  const y = manualRef(0)

  const isReady = ref(false)

  // 当前滚动位置
  // const currentScroll = reactive({
  //   x: -scrollX.value,
  //   y: -scrollY.value
  // })

  const percentX = manualRef(0)
  const percentY = manualRef(0)

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

  watch(wrapperEl, () => {
    refreshWrapper()
  })
  watch(contentEl, () => {
    computeContentSize()
  })
  watch(scrollX, value => {
    // x.value = -value
    x.value = -value
    verifyScroll()
  })
  watch(scrollY, value => {
    // y.value = -value
    y.value = -value
    verifyScroll()
  })
  watch(width, () => {
    refreshWrapper().then(verifyScroll)
  })
  watch(height, () => {
    refreshWrapper().then(verifyScroll)
  })

  function computeWrapperSize(sizeType: 'width' | 'height') {
    return nextTick(() => {
      if (!wrapper.el) return

      const size = sizeType === 'width' ? width.value : height.value
      const titleCaseSizeType = sizeType.slice(0, 1).toUpperCase() + sizeType.slice(1)

      // 获取 wrapper 的 px 大小
      if (typeof size === 'string') {
        if (!size.endsWith('px') && (!size || Number.isNaN(Number(size)))) {
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

  async function refreshWrapper() {
    const promises: Promise<void>[] = []

    if (mode.value !== 'vertical') {
      promises.push(computeWrapperSize('width'))
    }

    if (mode.value !== 'horizontal') {
      promises.push(computeWrapperSize('height'))
    }

    await Promise.all(promises)
  }

  let timer: ReturnType<typeof setTimeout>

  function computeContentSize() {
    clearTimeout(timer)

    return new Promise<void>(resolve => {
      timer = setTimeout(() => {
        if (!content.el) {
          resolve()
          return
        }

        if (mode.value !== 'vertical') {
          content.width = content.el.offsetWidth

          if (wrapper.width >= content.width) {
            x.value = 0
          } else {
            if (x.value === 0) {
              x.value = -scrollX.value
            }
          }
        }

        if (mode.value !== 'horizontal') {
          content.height = content.el.offsetHeight

          if (wrapper.height >= content.height) {
            y.value = 0
          } else {
            if (y.value === 0) {
              y.value = -scrollY.value
            }
          }
        }

        isReady.value = false

        setTimeout(() => {
          isReady.value = true
          verifyScroll()
          resolve()
        }, 1)
      }, 0)
    })
  }

  /**
   * Will post process the percent scroll values.
   */
  function verifyScroll() {
    if (!isReady.value) {
      return
    }

    if (mode.value !== 'vertical') {
      x.value = Math.min(0, Math.max(x.value, xScrollLimit.value))

      if (mode.value !== 'both') {
        y.value = 0
      }
    }

    if (mode.value !== 'horizontal') {
      y.value = Math.min(0, Math.max(y.value, yScrollLimit.value))

      if (mode.value !== 'both') {
        x.value = 0
      }
    }

    computePercent()
    triggerUpdate()
  }

  function computePercent() {
    percentX.value = multipleFixed(x.value / (xScrollLimit.value || -1), 100, 2)
    percentY.value = multipleFixed(y.value / (yScrollLimit.value || -1), 100, 2)

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

  async function refresh() {
    if (typeof onBeforeRefresh === 'function') {
      onBeforeRefresh()
    }

    refreshWrapper()
    await computeContentSize().then(() => {
      setTimeout(
        () => {
          verifyScroll()

          if (typeof onAfterRefresh === 'function') {
            onAfterRefresh()
          }
        },
        isMounted ? 20 : 100
      )
    })
  }

  return {
    wrapperEl,
    contentEl,

    wrapper,
    content,
    isReady,
    x,
    y,
    // currentScroll,
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
    refresh,
    triggerUpdate
  }
}
