import { Popper } from '@/components/popper'

import {
  Fragment,
  computed,
  createTextVNode,
  defineComponent,
  mergeProps,
  ref,
  renderSlot,
  shallowReadonly,
  toRef,
  watch
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import {
  placementWhileList,
  useClickOutside,
  useListener,
  usePopper,
  useSetTimeout
} from '@vexip-ui/hooks'
import { isElement } from '@vexip-ui/utils'
import { tooltipProps } from './props'

import type { PopperExposed } from '@/components/popper'
import type { VirtualElement } from '@vexip-ui/hooks'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'Tooltip',
  inheritAttrs: true,
  props: tooltipProps,
  emits: ['clickoutside', 'update:visible'],
  setup(_props, { attrs, slots, emit, expose }) {
    const nh = useNameHelper('tooltip')
    const props = useProps('tooltip', _props, {
      trigger: {
        default: 'hover',
        validator: value => ['hover', 'click', 'focus', 'custom'].includes(value)
      },
      wrapper: false,
      noArrow: false,
      transitionName: () => nh.ns('fade'),
      visible: false,
      placement: {
        default: 'top',
        validator: value => placementWhileList.includes(value)
      },
      outsideClose: true,
      noHover: false,
      tipClass: null,
      tipStyle: null,
      transfer: false,
      disabled: false,
      raw: false,
      delay: 250,
      tipAlive: false,
      reverse: false,
      width: 'auto',
      virtual: null
    })

    const placement = toRef(props, 'placement')
    const currentVisible = ref(props.visible)
    const rendering = ref(props.visible)
    const transfer = toRef(props, 'transfer')
    const triggerWidth = ref(100)
    const originalTrigger = ref<HTMLElement>()

    const reference = computed(() => {
      const virtual = (props.virtual as any)?.$el ?? props.virtual

      if (virtual) {
        if ('getBoundingClientRect' in virtual) {
          return virtual as VirtualElement
        }

        if ('x' in virtual && 'y' in virtual) {
          return {
            getBoundingClientRect: () => ({
              x: virtual.x,
              y: virtual.y,
              left: virtual.x,
              top: virtual.y,
              width: 0,
              height: 0
            })
          } as VirtualElement
        }
      }

      return originalTrigger.value
    })
    const trigger = computed(() => (isElement(reference.value) ? reference.value : null))
    const delay = computed(() => {
      return typeof props.delay === 'number'
        ? new Array<number>(2).fill(Math.max(props.delay, 0))
        : props.delay.map(delay => Math.max(delay, 0))
    })

    const popper = ref<PopperExposed>()
    const popperEl = computed(() => popper.value?.wrapper)
    const arrow = ref<HTMLElement>()
    const { transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      arrow,
      reference,
      wrapper: originalTrigger,
      popper: popperEl
    })

    useClickOutside(handleClickOutside, originalTrigger)
    useClickOutside(() => {
      if (currentVisible.value && !originalTrigger.value) {
        handleClickOutside()
      }
    }, popperEl)

    const tipStyle = computed(() => {
      if (props.width === 'auto') {
        return props.tipStyle
      }

      if (props.width === 'trigger') {
        return [{ width: `${triggerWidth.value}px` }, props.tipStyle]
      }

      return [{ width: `${props.width}px` }, props.tipStyle]
    })

    const slotParams = shallowReadonly({ toggleVisible, updatePopper })

    useListener(trigger, 'mouseenter', handleTriggerEnter)
    useListener(trigger, 'mouseleave', handleTriggerLeave)
    useListener(trigger, 'click', handleTriggerClick)
    useListener(trigger, 'focus', handleTriggerFocus)
    useListener(trigger, 'blur', handleTriggerBlur)
    useListener(popperEl, 'mouseenter', handleTriggerEnter)
    useListener(popperEl, 'mouseleave', handleTriggerLeave)

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value

        if (value) {
          rendering.value = true
          updatePopper()
        }
      }
    )
    watch(
      () => props.disabled,
      value => {
        if (value) {
          toggleVisible(false)
        }
      }
    )

    expose({ trigger, toggleVisible, updatePopper })

    function toggleVisible(visible = !currentVisible.value) {
      currentVisible.value = visible

      if (visible) {
        computeTriggerWidth()
        rendering.value = true
        updatePopper()
      }

      emit('update:visible', visible)
      emitEvent(props.onToggle, visible)
    }

    function computeTriggerWidth() {
      if (!trigger.value) return

      triggerWidth.value = trigger.value.offsetWidth
    }

    const { timer } = useSetTimeout()

    function handleTriggerEnter() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        timer.hover = setTimeout(() => {
          toggleVisible(true)
        }, delay.value[0] ?? 250)
      }

      emitEvent(props.onTipEnter)
    }

    function handleTriggerLeave() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        timer.hover = setTimeout(() => {
          toggleVisible(false)
        }, delay.value[1] ?? 250)
      }

      emitEvent(props.onTipLeave)
    }

    function handleTriggerClick() {
      if (props.disabled) return

      if (props.trigger === 'click') {
        toggleVisible()
      }
    }

    function handleTriggerFocus() {
      if (props.disabled) return

      if (props.trigger === 'focus') {
        toggleVisible(true)
      }
    }

    function handleTriggerBlur() {
      if (props.disabled) return

      if (props.trigger === 'focus') {
        toggleVisible(false)
      }
    }

    function handleClickOutside() {
      if (props.disabled) return

      emitEvent(props.onClickOutside)

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        toggleVisible(false)
        emitEvent(props.onOutsideClose)
      }
    }

    function syncTriggerRef(el?: HTMLElement | null) {
      if (el) {
        originalTrigger.value = el.nextElementSibling as HTMLElement | undefined
      } else {
        originalTrigger.value = undefined
      }
    }

    function syncRendering() {
      rendering.value = currentVisible.value
    }

    function stopPropagation(event: MouseEvent) {
      event.stopPropagation()
    }

    return () => {
      const CustomTag = props.wrapper
        ? ((props.wrapper === true ? 'span' : props.wrapper) as any)
        : null
      const triggers = slots.trigger?.(slotParams)
      const triggerVNode = triggers ? triggers[0] : null

      const renderTrigger = () => {
        if (!triggerVNode) return null

        if (triggerVNode.type === TEXT_VNODE) {
          return CustomTag ? <span>{triggerVNode}</span> : <span {...attrs}>{triggerVNode}</span>
        }

        if (!CustomTag) {
          triggerVNode.props = mergeProps(triggerVNode.props || {}, attrs)
        }

        return triggerVNode
      }

      return [
        triggerVNode &&
          (CustomTag
            ? (
              <CustomTag
                {...attrs}
                ref={originalTrigger}
                class={[nh.b(), nh.bs('vars'), props.inherit && nh.bm('inherit')]}
              >
                {triggers}
              </CustomTag>
              )
            : (
              <Fragment ref={syncTriggerRef as any}>{renderTrigger()}</Fragment>
              )),
        !props.disabled && (
          <Popper
            ref={popper}
            class={{
              [nh.be('popper')]: true,
              [nh.bs('vars')]: true,
              [nh.bem('popper', props.reverse ? 'dark' : 'light')]: true,
              [nh.bem('popper', 'no-hover')]: props.noHover,
              [nh.bem('popper', 'no-arrow')]: props.noArrow
            }}
            appear
            visible={currentVisible.value}
            alive={props.tipAlive}
            to={transferTo.value}
            transition={props.transitionName}
            role={'tooltip'}
            tabindex={-1}
            onClick={stopPropagation}
            onAnimationend={syncRendering}
            onTransitionend={syncRendering}
          >
            <div class={[!props.raw && nh.be('tip'), props.tipClass]} style={tipStyle.value}>
              {renderSlot(slots, 'default', slotParams)}
            </div>
            {!props.raw && !props.noArrow && <div ref={arrow} class={nh.be('arrow')}></div>}
          </Popper>
        )
      ]
    }
  }
})
