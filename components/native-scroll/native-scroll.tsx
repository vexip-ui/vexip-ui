import {
  defineComponent,
  ref,
  computed,
  watch,
  toRef,
  onBeforeUnmount,
  nextTick,
  renderSlot
} from 'vue'
import { Scrollbar } from '@/components/scrollbar'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import {
  USE_TOUCH,
  isClient,
  isElement,
  isTrue,
  createEventEmitter,
  flatVNodes
} from '@vexip-ui/utils'
import { nativeScrollProps } from './props'
import { useScrollWrapper } from './hooks'

import type { EventHandler } from '@vexip-ui/utils'
import type { NativeScrollMode } from './symbol'

const scrollModes = Object.freeze<NativeScrollMode[]>(['horizontal', 'vertical', 'both'])

const MOVE_EVENT = 'mousemove'
const UP_EVENT = 'mouseup'

export default defineComponent({
  name: 'NativeScroll',
  components: {
    Scrollbar,
    ResizeObserver
  },
  props: nativeScrollProps,
  emits: [],
  setup(_props, { slots, expose }) {
    const props = useProps('nativeScroll', _props, {
      scrollClass: null,
      scrollStyle: null,
      scrollAttrs: null,
      mode: {
        default: 'vertical',
        validator: value => scrollModes.includes(value)
      },
      width: '',
      height: '',
      disabled: false,
      pointer: false,
      scrollX: {
        default: 0,
        static: true
      },
      scrollY: {
        default: 0,
        static: true
      },
      useXBar: false,
      useYBar: false,
      barFade: 1500,
      barClass: null,
      autoplay: false,
      playWaiting: 500,
      onBeforeScroll: {
        default: null,
        isFunc: true
      },
      appear: false,
      barDuration: null,
      useBarTrack: false,
      scrollTag: 'div'
    })

    const emitter = createEventEmitter()

    const nh = useNameHelper('native-scroll')
    const usingBar = ref(false)
    const scrolling = ref(false)

    const wrapper = ref<HTMLElement>()
    const xBar = ref<InstanceType<typeof Scrollbar>>()
    const yBar = ref<InstanceType<typeof Scrollbar>>()

    const {
      contentElement,

      content,
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
    } = useScrollWrapper({
      mode: toRef(props, 'mode'),
      disabled: toRef(props, 'disabled'),
      appear: toRef(props, 'appear'),
      width: toRef(props, 'width'),
      height: toRef(props, 'height'),
      scrollX: toRef(props, 'scrollX'),
      scrollY: toRef(props, 'scrollY'),
      onResize: entry => {
        emitEvent(props.onResize, entry)
      },
      onBeforeRefresh: stopAutoplay,
      onAfterRefresh: () => {
        syncBarScroll()
        startAutoplay()
      }
    })

    /* autoplay */
    const canPlay = ref(false)

    const canAutoplay = computed(() => {
      return (
        props.mode !== 'both' &&
        (isTrue(props.autoplay) || props.autoplay > 1000) &&
        ((props.mode === 'horizontal' && enableXScroll.value) ||
          (props.mode === 'vertical' && enableYScroll.value))
      )
    })

    watch(
      () => props.autoplay,
      () => {
        stopAutoplay()
        nextTick(startAutoplay)
      }
    )
    watch(
      () => props.playWaiting,
      () => {
        stopAutoplay()
        nextTick(startAutoplay)
      }
    )

    let playTimer: ReturnType<typeof setTimeout>
    let startTimer: ReturnType<typeof setTimeout>
    let endTimer: ReturnType<typeof setTimeout>

    onBeforeUnmount(stopAutoplay)

    function startAutoplay() {
      if (!canAutoplay.value || !contentElement.value) return

      stopAutoplay()

      const mode = props.mode
      const distance = mode === 'horizontal' ? 'offsetWidth' : 'offsetHeight'
      const limit = mode === 'horizontal' ? xScrollLimit : yScrollLimit
      const prop = mode === 'horizontal' ? 'x' : 'y'
      const waiting = props.playWaiting < 20 ? 20 : props.playWaiting
      const setScroll = mode === 'horizontal' ? setScrollX : setScrollY

      let playSpeed = 0.5

      if (typeof props.autoplay === 'number') {
        playSpeed = (contentElement.value[distance] / props.autoplay) * 16
      }

      const scroll = () => {
        setScroll(currentScroll[prop] + playSpeed)

        if (currentScroll[prop] >= limit.value) {
          setScroll(limit.value)
          canPlay.value = false

          computePercent()
          syncBarScroll()

          endTimer = setTimeout(() => {
            scrollTo(0, 0, 500)

            startTimer = setTimeout(() => {
              canPlay.value = true
              scroll()
            }, 500 + waiting)
          }, waiting)
        } else {
          computePercent()
          syncBarScroll()

          if (canPlay.value) {
            requestAnimationFrame(scroll)
          }
        }
      }

      playTimer = setTimeout(() => {
        canPlay.value = true
        scroll()
      }, waiting)
    }

    function stopAutoplay() {
      canPlay.value = false

      clearTimeout(playTimer)
      clearTimeout(startTimer)
      clearTimeout(endTimer)
    }
    /* autoplay */

    const className = computed(() => {
      return [
        nh.b(),
        nh.bm(props.mode),
        {
          [nh.bm('inherit')]: props.inherit
        }
      ]
    })
    const style = computed(() => {
      const { width, height } = props

      return {
        width: width
          ? typeof width === 'string'
            ? Number.isNaN(Number(width))
              ? width
              : `${Number(width)}px`
            : `${width}px`
          : undefined,
        height: height
          ? typeof height === 'string'
            ? Number.isNaN(Number(height))
              ? height
              : `${Number(height)}px`
            : `${height}px`
          : undefined
      }
    })
    const wrapperClass = computed(() => {
      return [
        props.scrollAttrs?.class,
        props.scrollClass,
        nh.be('wrapper'),
        {
          [nh.bem('wrapper', 'scrolling')]: scrolling.value,
          [nh.bem('wrapper', 'using-bar')]: usingBar.value
        }
      ]
    })

    const willMutate = ref(false)

    function handleMutate() {
      willMutate.value = true
      nextTick(() => {
        refresh()
        willMutate.value = false
      })
    }

    let observer: MutationObserver | undefined

    function createMutation() {
      if (!isClient || !contentElement.value) return

      observer = new MutationObserver(handleMutate)
      observer.observe(contentElement.value, {
        childList: true
      })
    }

    function clearMutation() {
      observer?.disconnect()
      observer = undefined
    }

    watch(
      contentElement,
      () => {
        clearMutation()
        createMutation()
      },
      { immediate: true }
    )
    watch(enableXScroll, value => {
      emitEvent(props.onXEnabledChange, value)
    })
    watch(enableYScroll, value => {
      emitEvent(props.onYEnabledChange, value)
    })

    expose({
      percentX,
      percentY,
      currentScroll,
      xScrollLimit,
      yScrollLimit,

      xBarLength,
      yBarLength,
      enableXScroll,
      enableYScroll,

      wrapper,
      content: contentElement,
      xBar,
      yBar,

      refresh,
      scrollTo,
      scrollBy,
      scrollToElement,
      ensureInView,
      getXScrollLimit,
      getYScrollLimit,
      addScrollListener,
      removeScrollListener
    })

    function syncBarScroll() {
      xBar.value?.handleScroll(percentX.value)
      yBar.value?.handleScroll(percentY.value)
    }

    function handleMouseDown(event: MouseEvent) {
      if (!props.pointer || event.button !== 0 || USE_TOUCH) {
        return false
      }

      handlePointerDown(event)
    }

    // 记录滚动开始位置
    let xScrollStartAt = 0
    let yScrollStartAt = 0

    // 记录滚动开始鼠标位置
    let cursorXPosition = 0
    let cursorYPosition = 0

    function handlePointerDown(event: MouseEvent) {
      if (!enableXScroll.value && !enableYScroll.value) {
        return false
      }

      event.preventDefault()
      prepareScroll()

      xScrollStartAt = currentScroll.x
      yScrollStartAt = currentScroll.y
      cursorXPosition = event.clientX
      cursorYPosition = event.clientY

      document.addEventListener(MOVE_EVENT, handlePointerMove)
      document.addEventListener(UP_EVENT, handlePointerUp)

      emitEvent(props.onScrollStart, {
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function handlePointerMove(event: MouseEvent) {
      event.stopPropagation()
      event.preventDefault()

      const signX = event.clientX - cursorXPosition > 0 ? 1 : -1
      const signY = event.clientY - cursorYPosition > 0 ? 1 : -1

      if (props.onBeforeScroll?.({ signX, signY }) === false) {
        return false
      }

      scrolling.value = true

      if (enableXScroll.value) {
        setScrollX(xScrollStartAt - (event.clientX - cursorXPosition))
      }

      if (enableYScroll.value) {
        setScrollY(yScrollStartAt - (event.clientY - cursorYPosition))
      }

      computePercent()
      syncBarScroll()
      emitScrollEvent(props.mode)
    }

    function handlePointerUp() {
      document.removeEventListener(MOVE_EVENT, handlePointerMove)
      document.removeEventListener(UP_EVENT, handlePointerUp)
      emitEvent(props.onScrollEnd, {
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      startAutoplay()
    }

    function handleWheel(event: WheelEvent, type: 'vertical' | 'horizontal') {
      const isVerticalScroll = enableYScroll.value && type === 'vertical'
      const isHorizontalScroll = enableXScroll.value && type === 'horizontal'
      const sign = event.deltaY > 0 ? 1 : -1

      emitEvent(props.onWheel, event, type)

      if (
        (isVerticalScroll || isHorizontalScroll) &&
        props.onBeforeScroll?.({ signX: sign, signY: sign }) !== false
      ) {
        const maxLimit = isVerticalScroll ? yScrollLimit.value : xScrollLimit.value
        const scroll = isVerticalScroll ? currentScroll.y : currentScroll.x

        if (sign > 0 ? scroll < maxLimit : scroll > 0) {
          event.stopPropagation()

          return false
        }
      }
    }

    function handleScroll(event: UIEvent) {
      event.stopPropagation()
      event.preventDefault()

      const type = contentElement.value?.scrollLeft !== currentScroll.x ? 'horizontal' : 'vertical'

      if (contentElement.value) {
        const signX = contentElement.value.scrollLeft - currentScroll.x > 0 ? 1 : -1
        const signY = contentElement.value.scrollTop - currentScroll.y > 0 ? 1 : -1

        if (props.onBeforeScroll?.({ signX, signY }) === false) {
          contentElement.value.scrollTop = currentScroll.y
          contentElement.value.scrollLeft = currentScroll.x

          return
        }

        currentScroll.y = contentElement.value.scrollTop
        currentScroll.x = contentElement.value.scrollLeft
      }

      computePercent()
      syncBarScroll()
      emitScrollEvent(type)
    }

    function prepareScroll() {
      stopAutoplay()
    }

    function handleBarScrollStart(type: 'vertical' | 'horizontal') {
      usingBar.value = true
      prepareScroll()
      emitEvent(props.onBarScrollStart, {
        type,
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function handleBarScrollEnd(type: 'vertical' | 'horizontal') {
      usingBar.value = false
      startAutoplay()
      emitEvent(props.onBarScrollEnd, {
        type,
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function handleXBarScroll(percent: number) {
      percentX.value = percent
      setScrollX((percent * xScrollLimit.value) / 100)
      emitEvent(props.onBarScroll, {
        type: 'horizontal',
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      emitScrollEvent('horizontal')
    }

    function handleYBarScroll(percent: number) {
      percentY.value = percent
      setScrollY((percent * yScrollLimit.value) / 100)
      emitEvent(props.onBarScroll, {
        type: 'vertical',
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      emitScrollEvent('vertical')
    }

    function emitScrollEvent(type: NativeScrollMode) {
      emitEvent(props.onScroll, {
        type,
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      emitter.emit('scroll', {
        type,
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function getSlotParams() {
      return {
        scrollX: currentScroll.x,
        scrollY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value,
        enableXScroll: enableXScroll.value,
        enableYScroll: enableYScroll.value,
        refresh,
        scrollTo,
        scrollBy,
        scrollToElement,
        ensureInView
      }
    }

    function getXScrollLimit() {
      return [0, xScrollLimit.value]
    }

    function getYScrollLimit() {
      return [0, yScrollLimit.value]
    }

    function ensureInView(el: string | Element, duration?: number, offset = 0) {
      if (!wrapper.value) return

      if (typeof el === 'string') {
        el = wrapper.value.querySelector(el)!
      }

      if (!isElement(el)) return

      const wrapperRect = wrapper.value.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()

      let clientX = 0
      let clientY = 0

      if (props.mode !== 'vertical') {
        if (elRect.left < wrapperRect.left + offset) {
          clientX = elRect.left - wrapperRect.left - offset
        } else if (elRect.right > wrapperRect.right - offset) {
          clientX = elRect.right - wrapperRect.right + offset
        }
      }

      if (props.mode !== 'horizontal') {
        if (elRect.top < wrapperRect.top + offset) {
          clientY = elRect.top - wrapperRect.top - offset
        } else if (elRect.bottom > wrapperRect.bottom - offset) {
          clientY = elRect.bottom - wrapperRect.bottom + offset
        }
      }

      scrollBy(clientX, clientY, duration)
    }

    function addScrollListener(listener: EventHandler) {
      emitter.on('scroll', listener)
    }

    function removeScrollListener(listener: EventHandler) {
      emitter.off('scroll', listener)
    }

    return () => {
      const Content = (props.scrollTag || 'div') as 'div'
      const children = renderSlot(slots, 'default', getSlotParams()).children

      return (
        <div
          ref={wrapper}
          class={className.value}
          style={style.value}
          onMousedown={handleMouseDown}
          onWheel={event => handleWheel(event, event.shiftKey ? 'horizontal' : 'vertical')}
        >
          <ResizeObserver on-resize={handleResize}>
            <Content
              ref={contentElement}
              {...props.scrollAttrs}
              class={wrapperClass.value}
              style={[props.scrollAttrs?.style, props.scrollStyle]}
              onScroll={handleScroll}
            >
              {slots.extra && (
                <div
                  class={nh.be('extra')}
                  style={{
                    width: willMutate.value ? undefined : `${content.scrollWidth}px`,
                    height: willMutate.value ? undefined : `${content.scrollHeight}px`
                  }}
                >
                  <div
                    class={nh.be('extra-inner')}
                    style={{
                      width: `${content.offsetWidth}px`,
                      height: `${content.offsetHeight}px`
                    }}
                  >
                    {slots.extra?.(getSlotParams())}
                  </div>
                </div>
              )}
              {slots.default &&
                flatVNodes(children).map((vnode, index) => {
                  vnode.key = index
                  return (
                    <ResizeObserver key={index} on-resize={handleResize}>
                      {() => vnode}
                    </ResizeObserver>
                  )
                })}
            </Content>
          </ResizeObserver>
          {props.useXBar && (
            <Scrollbar
              ref={xBar}
              inherit
              placement={'bottom'}
              class={[nh.bem('bar', 'horizontal'), props.barClass]}
              fade={props.barFade}
              bar-length={xBarLength.value}
              disabled={!enableXScroll.value}
              appear={props.appear}
              duration={props.barDuration}
              use-track={props.useBarTrack}
              onScrollStart={() => handleBarScrollStart('horizontal')}
              onScroll={handleXBarScroll}
              onScrollEnd={() => handleBarScrollEnd('horizontal')}
            ></Scrollbar>
          )}
          {props.useYBar && (
            <Scrollbar
              ref={yBar}
              inherit
              placement={'right'}
              class={[nh.bem('bar', 'vertical'), props.barClass]}
              fade={props.barFade}
              bar-length={yBarLength.value}
              disabled={!enableYScroll.value}
              appear={props.appear}
              duration={props.barDuration}
              use-track={props.useBarTrack}
              onScrollStart={() => handleBarScrollStart('vertical')}
              onScroll={handleYBarScroll}
              onScrollEnd={() => handleBarScrollEnd('vertical')}
            ></Scrollbar>
          )}
        </div>
      )
    }
  }
})
