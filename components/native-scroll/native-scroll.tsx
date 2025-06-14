import { Scrollbar } from '@/components/scrollbar'
import { ResizeObserver } from '@/components/resize-observer'

import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  ref,
  renderSlot,
  shallowReadonly,
  toRef,
  watch,
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { createSlotRender, flatVNodes, useRtl } from '@vexip-ui/hooks'
import { USE_TOUCH, createEventEmitter, isClient, isElement, isTrue } from '@vexip-ui/utils'
import { nativeScrollProps } from './props'
import { useScrollWrapper } from './hooks'

import type { EventHandler } from '@vexip-ui/utils'
import type { NativeScrollMode } from './symbol'

const scrollModes = Object.freeze<NativeScrollMode[]>(['horizontal', 'vertical', 'both'])

const MOVE_EVENT = 'mousemove'
const UP_EVENT = 'mouseup'

export default defineComponent({
  name: 'NativeScroll',
  inheritAttrs: false,
  props: nativeScrollProps,
  emits: [],
  setup(_props, { attrs, slots, expose }) {
    const props = useProps('nativeScroll', _props, {
      scrollClass: null,
      scrollStyle: null,
      scrollAttrs: null,
      mode: {
        default: 'vertical',
        validator: value => scrollModes.includes(value),
      },
      width: '',
      height: '',
      disabled: false,
      pointer: false,
      scrollX: {
        default: 0,
        static: true,
      },
      scrollY: {
        default: 0,
        static: true,
      },
      useXBar: false,
      useYBar: false,
      barFade: 1500,
      barClass: null,
      autoplay: false,
      playWaiting: 500,
      appear: false,
      barDuration: null,
      useBarTrack: false,
      scrollTag: 'div',
      observeDeep: false,
      scrollOnly: false,
    })

    const emitter = createEventEmitter()

    const nh = useNameHelper('native-scroll')
    const { isRtl } = useRtl()
    const usingBar = ref(false)
    const scrolling = ref(false)

    const wrapper = ref<HTMLElement>()
    const xBar = ref<InstanceType<typeof Scrollbar>>()
    const yBar = ref<InstanceType<typeof Scrollbar>>()

    let initialized = false

    const {
      contentEl,

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

      handleResize,
      setScrollX,
      setScrollY,
      computePercent,
      refresh,
      scrollTo,
      scrollBy,
      scrollToElement,
      triggerUpdate,
    } = useScrollWrapper({
      mode: toRef(props, 'mode'),
      disabled: toRef(props, 'disabled'),
      appear: toRef(props, 'appear'),
      // width: toRef(props, 'width'),
      // height: toRef(props, 'height'),
      scrollX: toRef(props, 'scrollX'),
      scrollY: toRef(props, 'scrollY'),
      onResize: entry => {
        emitEvent(props.onResize, entry)
      },
      // onBeforeRefresh: stopAutoplay,
      onAfterRefresh: () => {
        syncBarScroll()

        if (!initialized) {
          initialized = true
          startAutoplay()
        }
      },
    })

    const slotParams = shallowReadonly({
      getState,
      refresh,
      scrollTo,
      scrollBy,
      scrollToElement,
      ensureInView,
    })

    /* autoplay */
    const canPlay = ref(false)

    const canAutoplay = computed(() => {
      return (
        props.mode !== 'both' &&
        (isTrue(props.autoplay) || +props.autoplay > 1000) &&
        ((props.mode === 'horizontal' && enableXScroll.value) ||
          (props.mode === 'vertical' && enableYScroll.value))
      )
    })

    watch([() => props.autoplay, () => props.playWaiting, contentEl], () => {
      stopAutoplay()
      nextTick(startAutoplay)
    })

    let playTimer: ReturnType<typeof setTimeout>
    let startTimer: ReturnType<typeof setTimeout>
    let endTimer: ReturnType<typeof setTimeout>

    onBeforeUnmount(stopAutoplay)

    function startAutoplay() {
      stopAutoplay()

      if (!canAutoplay.value || !contentEl.value) return

      const mode = props.mode
      const distance = mode === 'horizontal' ? 'offsetWidth' : 'offsetHeight'
      const limit = mode === 'horizontal' ? xScrollLimit : yScrollLimit
      const prop = mode === 'horizontal' ? x : y
      const waiting = props.playWaiting < 20 ? 20 : props.playWaiting
      const setScroll = mode === 'horizontal' ? setScrollX : setScrollY

      let playSpeed = 0.5

      if (typeof props.autoplay === 'number') {
        playSpeed = (contentEl.value[distance] / props.autoplay) * 16
      }

      const scroll = () => {
        setScroll(prop.value + playSpeed)

        if (prop.value >= limit.value) {
          setScroll(limit.value)
          canPlay.value = false

          computePercent()
          triggerUpdate()
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
          triggerUpdate()
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
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('scrolling')]: scrolling.value,
          [nh.bm('using-bar')]: usingBar.value,
        },
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
          : undefined,
      }
    })
    const wrapperClass = computed(() => {
      return [props.scrollAttrs?.class, props.scrollClass, nh.be('wrapper')]
    })
    const barFade = computed(() => (canAutoplay.value ? 0 : props.barFade))

    const willMutate = ref(false)

    function handleMutate() {
      willMutate.value = true
      nextTick(refresh)
      requestAnimationFrame(() => {
        willMutate.value = false
      })
    }

    let observer: MutationObserver | undefined

    function createMutation() {
      if (!isClient || !contentEl.value) return

      observer = new MutationObserver(handleMutate)
      observer.observe(contentEl.value, {
        childList: true,
      })
    }

    function clearMutation() {
      observer?.disconnect()
      observer = undefined
    }

    watch(
      contentEl,
      () => {
        clearMutation()
        createMutation()
      },
      { immediate: true },
    )
    watch(enableXScroll, value => {
      emitEvent(props.onXEnabledChange, value)
    })
    watch(enableYScroll, value => {
      emitEvent(props.onYEnabledChange, value)
    })

    expose({
      x,
      y,
      percentX,
      percentY,
      xScrollLimit,
      yScrollLimit,

      xBarLength,
      yBarLength,
      enableXScroll,
      enableYScroll,

      wrapper,
      content: contentEl,
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
      removeScrollListener,
    })

    function getCommonPayload() {
      return {
        clientX: (isRtl.value ? -1 : 1) * x.value,
        clientY: y.value,
        percentX: percentX.value,
        percentY: percentY.value,
      }
    }

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

      prepareScroll()

      xScrollStartAt = x.value
      yScrollStartAt = y.value
      cursorXPosition = event.clientX
      cursorYPosition = event.clientY

      document.addEventListener(MOVE_EVENT, handlePointerMove)
      document.addEventListener(UP_EVENT, handlePointerUp)

      emitEvent(props.onScrollStart, getCommonPayload())
    }

    function handlePointerMove(event: MouseEvent) {
      event.stopPropagation()
      event.preventDefault()

      scrolling.value = true

      if (enableXScroll.value) {
        setScrollX(xScrollStartAt - (event.clientX - cursorXPosition))
      }

      if (enableYScroll.value) {
        setScrollY(yScrollStartAt - (event.clientY - cursorYPosition))
      }

      computePercent()
      triggerUpdate()
      syncBarScroll()
      emitScrollEvent(props.mode)
    }

    function handlePointerUp() {
      document.removeEventListener(MOVE_EVENT, handlePointerMove)
      document.removeEventListener(UP_EVENT, handlePointerUp)

      emitEvent(props.onScrollEnd, getCommonPayload())
      startAutoplay()
    }

    function handleWheel(event: WheelEvent, type: 'vertical' | 'horizontal') {
      const isVerticalScroll = enableYScroll.value && type === 'vertical'
      const isHorizontalScroll = enableXScroll.value && type === 'horizontal'
      const sign = event.deltaY > 0 ? 1 : -1

      emitEvent(props.onWheel, event, type)

      if (isVerticalScroll || isHorizontalScroll) {
        const maxLimit = isVerticalScroll ? yScrollLimit.value : xScrollLimit.value
        const scroll = isVerticalScroll ? y.value : x.value

        if (sign > 0 ? scroll < maxLimit : scroll > 0) {
          event.stopPropagation()

          return false
        }
      }
    }

    function handleScroll(event: UIEvent) {
      if (!contentEl.value) return

      event.stopPropagation()

      const type = contentEl.value?.scrollLeft !== x.value ? 'horizontal' : 'vertical'

      y.value = contentEl.value.scrollTop
      x.value = contentEl.value.scrollLeft

      computePercent()
      triggerUpdate()
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
        ...getCommonPayload(),
        type,
      })
    }

    function handleBarScrollEnd(type: 'vertical' | 'horizontal') {
      usingBar.value = false
      startAutoplay()
      emitEvent(props.onBarScrollEnd, {
        ...getCommonPayload(),
        type,
      })
    }

    function handleXBarScroll(percent: number) {
      percentX.value = percent
      setScrollX((percent * xScrollLimit.value) / 100)
      triggerUpdate()
      emitEvent(props.onBarScroll, {
        ...getCommonPayload(),
        type: 'horizontal',
      })
      emitScrollEvent('horizontal')
    }

    function handleYBarScroll(percent: number) {
      percentY.value = percent
      setScrollY((percent * yScrollLimit.value) / 100)
      triggerUpdate()
      emitEvent(props.onBarScroll, {
        ...getCommonPayload(),
        type: 'vertical',
      })
      emitScrollEvent('vertical')
    }

    function emitScrollEvent(type: NativeScrollMode) {
      emitEvent(props.onScroll, {
        ...getCommonPayload(),
        type,
      })
      emitter.emit('scroll', {
        ...getCommonPayload(),
        type,
      })
    }

    function getState() {
      const { clientX: scrollX, clientY: scrollY, percentX, percentY } = getCommonPayload()

      return {
        scrollX,
        scrollY,
        percentX,
        percentY,
        enableXScroll: enableXScroll.value,
        enableYScroll: enableYScroll.value,
      }
    }

    function getXScrollLimit() {
      return [0, xScrollLimit.value]
    }

    function getYScrollLimit() {
      return [0, yScrollLimit.value]
    }

    function ensureInView(el: string | Element, duration?: number, offset = 0) {
      if (!wrapper.value) return Promise.resolve()

      if (typeof el === 'string') {
        el = wrapper.value.querySelector(el)!
      }

      if (!isElement(el)) return Promise.resolve()

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

      return scrollBy(clientX, clientY, duration)
    }

    function addScrollListener(listener: EventHandler) {
      emitter.on('scroll', listener)
    }

    function removeScrollListener(listener: EventHandler) {
      emitter.off('scroll', listener)
    }

    function renderContent() {
      const Content = (props.scrollTag || 'div') as any
      const children =
        props.observeDeep && slots.default ? renderSlot(slots, 'default', slotParams).children : []

      return (
        <Content
          {...props.scrollAttrs}
          {...(props.scrollOnly ? attrs : {})}
          ref={contentEl}
          class={wrapperClass.value}
          style={[props.scrollAttrs?.style, props.scrollStyle, props.scrollOnly && style.value]}
          onMousedown={handleMouseDown}
          onWheelPassive={(event: WheelEvent) =>
            handleWheel(event, event.shiftKey ? 'horizontal' : 'vertical')}
          onScroll={handleScroll}
        >
          {slots.extra && (
            <div
              class={nh.be('extra')}
              style={{
                width: willMutate.value ? undefined : `${content.scrollWidth}px`,
                height: willMutate.value ? undefined : `${content.scrollHeight}px`,
              }}
            >
              <div
                class={nh.be('extra-inner')}
                style={{
                  width: `${content.offsetWidth}px`,
                  height: `${content.offsetHeight}px`,
                }}
              >
                {renderSlot(slots, 'extra', slotParams)}
              </div>
            </div>
          )}
          {slots.default &&
            (props.observeDeep
              ? flatVNodes(children).map((vnode, index) => {
                return (
                  <ResizeObserver key={vnode.key ?? index} on-resize={handleResize}>
                    {() => vnode}
                  </ResizeObserver>
                )
              })
              : renderSlot(slots, 'default', slotParams))}
        </Content>
      )
    }

    return () => {
      if (props.scrollOnly) {
        return <ResizeObserver on-resize={handleResize}>{renderContent()}</ResizeObserver>
      }

      return (
        <div
          {...attrs}
          ref={wrapper}
          class={[className.value, attrs.class]}
          style={[style.value, attrs.style as any]}
        >
          {createSlotRender(slots, ['prefix-trap', 'prefixTrap'])?.()}
          <ResizeObserver on-resize={handleResize}>{renderContent()}</ResizeObserver>
          {props.useXBar && (
            <Scrollbar
              ref={xBar}
              inherit
              placement={'bottom'}
              class={[nh.bem('bar', 'horizontal'), props.barClass]}
              fade={barFade.value}
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
              fade={barFade.value}
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
          {createSlotRender(slots, ['suffix-trap', 'suffixTrap'])?.()}
        </div>
      )
    }
  },
})
