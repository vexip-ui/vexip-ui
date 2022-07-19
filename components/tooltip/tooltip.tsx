import {
  defineComponent,
  ref,
  toRef,
  computed,
  watch,
  createTextVNode,
  mergeProps,
  Fragment,
  Transition
} from 'vue'
import { Portal } from '@/components/portal'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  classProp,
  styleProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import {
  useClickOutside,
  placementWhileList,
  usePopper,
  useSetTimeout,
  useListener
} from '@vexip-ui/mixins'

import type { PropType } from 'vue'
import type { Placement, VirtualElement } from '@vexip-ui/mixins'
import type { ToopTipTrigger, TooltipVirtual } from './symbol'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'Tooltip',
  components: {
    Portal
  },
  inheritAttrs: true,
  props: {
    trigger: String as PropType<ToopTipTrigger>,
    wrapper: booleanStringProp,
    noArrow: booleanProp,
    transitionName: String,
    visible: booleanProp,
    placement: String as PropType<Placement>,
    outsideClose: booleanProp,
    noHover: booleanProp,
    tipClass: classProp,
    tipStyle: styleProp,
    transfer: booleanStringProp,
    disabled: booleanProp,
    raw: booleanProp,
    delay: Number,
    tipAlive: booleanProp,
    reverse: booleanProp,
    width: [String, Number] as PropType<number | 'trigger' | 'auto'>,
    virtual: Object as PropType<TooltipVirtual>,
    onToggle: eventProp<(visible: boolean) => void>(),
    onTipEnter: eventProp(),
    onTipLeave: eventProp(),
    onClickoutside: eventProp(),
    onOutsideClose: eventProp()
  },
  emits: ['update:visible'],
  setup(_props, { attrs, slots, emit, expose }) {
    const props = useProps('tooltip', _props, {
      trigger: {
        default: 'hover' as ToopTipTrigger,
        validator: (value: ToopTipTrigger) => ['hover', 'click', 'focus', 'custom'].includes(value)
      },
      wrapper: false,
      noArrow: false,
      transitionName: 'vxp-fade',
      visible: false,
      placement: {
        default: 'top',
        validator: (value: Placement) => placementWhileList.includes(value)
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
      virtual: null,
      onToggle: null,
      onTipEnter: null,
      onTipLeave: null,
      onClickoutside: null,
      onOutsideClose: null
    })

    const nh = useNameHelper('tooltip')
    const placement = toRef(props, 'placement')
    const currentVisible = ref(props.visible)
    const rendering = ref(props.visible)
    const transfer = toRef(props, 'transfer')
    const triggerWidth = ref(100)
    const originalTrigger = ref<HTMLElement | null>(null)

    const reference = computed(() => {
      const virtual = (props.virtual as any)?.$el ?? props.virtual

      if (virtual) {
        if ('getBoundingClientRect' in virtual) {
          return virtual as VirtualElement
        } else if ('x' in virtual && 'y' in virtual) {
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
    const trigger = computed(() => {
      return reference.value instanceof Element ? reference.value : null
    })

    useClickOutside(handleClickOutside, originalTrigger)
    const { popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      reference,
      wrapper: originalTrigger
    })

    const tipStyle = computed(() => {
      if (props.width === 'auto') {
        return props.tipStyle
      }

      if (props.width === 'trigger') {
        return [{ width: `${triggerWidth.value}px` }, props.tipStyle]
      }

      return [{ width: `${props.width}px` }, props.tipStyle]
    })

    useListener(trigger, 'mouseenter', handleTriggerEnter)
    useListener(trigger, 'mouseleave', handleTriggerLeave)
    useListener(trigger, 'click', handleTriggerClick)
    useListener(trigger, 'focus', handleTriggerFocus)
    useListener(trigger, 'blur', handleTriggerBlur)
    useListener(popper, 'mouseenter', handleTriggerEnter)
    useListener(popper, 'mouseleave', handleTriggerLeave)

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

    expose({ toggleVisible, updatePopper })

    function toggleVisible(visible = !currentVisible.value) {
      currentVisible.value = visible

      if (visible) {
        computeTriggerWidth()
        rendering.value = true
        updatePopper()
      }

      emitEvent(props.onToggle, visible)
      emit('update:visible', visible)
    }

    function computeTriggerWidth() {
      if (!trigger.value) return

      triggerWidth.value = trigger.value.offsetWidth
    }

    const { timer } = useSetTimeout()

    function handleTriggerEnter() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        window.clearTimeout(timer.hover)

        timer.hover = window.setTimeout(() => {
          toggleVisible(true)
        }, 250)
      }

      emitEvent(props.onTipEnter)
    }

    function handleTriggerLeave() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        window.clearTimeout(timer.hover)

        timer.hover = window.setTimeout(() => {
          toggleVisible(false)
        }, 250)
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

      emitEvent(props.onClickoutside)

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        toggleVisible(false)
        emitEvent(props.onOutsideClose)
      }
    }

    function syncTriggerRef(el: HTMLElement | null) {
      if (el) {
        originalTrigger.value = el.nextElementSibling as HTMLElement | null
      } else {
        originalTrigger.value = null
      }
    }

    function syncRendering() {
      rendering.value = currentVisible.value
    }

    return () => {
      const CustomTag = props.wrapper
        ? ((props.wrapper === true ? 'span' : props.wrapper) as any)
        : null
      const triggers = slots.trigger?.()
      const triggerVNode = triggers ? triggers[0] : null

      const stopPropagation = (event: MouseEvent) => {
        event.stopPropagation()
      }
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
            <CustomTag {...attrs} ref={originalTrigger} class={[nh.b(), nh.bs('vars')]}>
              {triggers}
            </CustomTag>
              )
            : (
            <Fragment ref={syncTriggerRef as any}>{renderTrigger()}</Fragment>
              )),
        !props.disabled && (
          <Portal to={transferTo.value}>
            {(props.tipAlive || rendering.value) && (
              <Transition appear name={props.transitionName}>
                <div
                  v-show={currentVisible.value}
                  ref={popper}
                  class={{
                    [nh.be('popper')]: true,
                    [nh.bs('vars')]: true,
                    [nh.bem('popper', props.reverse ? 'dark' : 'light')]: true,
                    [nh.bem('popper', 'no-hover')]: props.noHover,
                    [nh.bem('popper', 'no-arrow')]: props.noArrow
                  }}
                  onClick={stopPropagation}
                  onAnimationend={syncRendering}
                  onTransitionend={syncRendering}
                >
                  <div
                    class={[!props.raw && nh.be('tip'), props.tipClass]}
                    role={'tooltip'}
                    style={tipStyle.value}
                  >
                    {!props.raw && !props.noArrow && <div class={nh.be('arrow')}></div>}
                    {slots.default?.()}
                  </div>
                </div>
              </Transition>
            )}
          </Portal>
        )
      ]
    }
  }
})
