import { defineComponent, ref, computed, inject } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { FIELD_OPTIONS } from '@/components/form/symbol'
import {
  useNameHelper,
  useProps,
  booleanProp,
  sizeProp,
  createSizeProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { Spinner } from '@vexip-ui/icons'
import { parseColorToRgba, mixColor, adjustAlpha } from '@vexip-ui/utils'
import { GROUP_STATE, buttonTypes } from './symbol'

import type { PropType } from 'vue'
import type { ButtonType, ButtonAttrType } from './symbol'

export default defineComponent({
  name: 'Button',
  components: {
    CollapseTransition,
    Icon
  },
  props: {
    size: sizeProp,
    type: String as PropType<ButtonType>,
    dashed: booleanProp,
    text: booleanProp,
    simple: booleanProp,
    ghost: booleanProp,
    disabled: booleanProp,
    loading: booleanProp,
    circle: booleanProp,
    loadingIcon: Object,
    loadingSpin: booleanProp,
    icon: Object,
    color: String,
    buttonType: String as PropType<ButtonAttrType>,
    block: booleanProp,
    tag: String,
    noPulse: booleanProp,
    onClick: eventProp<(event: MouseEvent) => void>()
  },
  emits: [],
  setup(_props, { slots }) {
    const fieldActions = inject(FIELD_OPTIONS, null)

    const props = useProps('button', _props, {
      size: createSizeProp(fieldActions ? fieldActions.size : undefined),
      type: {
        default: null,
        validator: value => buttonTypes.includes(value)
      },
      dashed: false,
      text: false,
      simple: false,
      ghost: false,
      disabled: () => (fieldActions ? fieldActions.disabled.value : false),
      loading: () => (fieldActions ? fieldActions.loading.value : false),
      circle: false,
      loadingIcon: Spinner,
      loadingSpin: false,
      icon: null,
      color: null,
      buttonType: {
        default: 'button',
        validator: value => ['button', 'submit', 'reset'].includes(value)
      },
      block: false,
      tag: 'button',
      noPulse: false
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('button')
    const pulsing = ref(false)
    const isIconOnly = computed(() => {
      return !slots.default
    })
    const type = computed(() => {
      return props.type ?? groupState?.type ?? 'default'
    })
    const size = computed(() => {
      return groupState?.size ?? props.size
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(type.value)]: type.value !== 'default',
        [nh.bm('simple')]: !props.ghost && props.simple,
        [nh.bm('ghost')]: props.ghost,
        [nh.bm('text')]: props.text,
        [nh.bm('dashed')]: props.dashed,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('loading')]: props.loading,
        [nh.bm('circle')]: props.circle,
        [nh.bm('icon-only')]: isIconOnly.value,
        [nh.bm(size.value)]: size.value !== 'default',
        [nh.bm('pulsing')]: pulsing.value
      }
    })
    const colorMap = computed(() => {
      if (props.color) {
        const rootStyle = getComputedStyle(document.documentElement)
        const black = parseColorToRgba(rootStyle.getPropertyValue(nh.nv('color-black')) || '#000')
        const white = parseColorToRgba(rootStyle.getPropertyValue(nh.nv('color-white')) || '#fff')
        const baseColor = parseColorToRgba(props.color)

        return {
          base: baseColor.toString(),
          light2: mixColor(white, baseColor, 0.2).toString(),
          dark1: mixColor(black, baseColor, 0.1).toString(),
          opacity1: adjustAlpha(baseColor, 0.9).toString(),
          opacity3: adjustAlpha(baseColor, 0.7).toString(),
          opacity4: adjustAlpha(baseColor, 0.6).toString(),
          opacity7: adjustAlpha(baseColor, 0.3).toString(),
          opacity8: adjustAlpha(baseColor, 0.2).toString()
        }
      }

      return null
    })
    const style = computed(() => {
      if (colorMap.value) {
        const { base, light2, dark1, opacity1, opacity3, opacity4, opacity7, opacity8 } =
          colorMap.value
        const gcv = nh.gcv

        if (props.ghost) {
          return nh.cvm({
            color: base,
            'color-hover': base,
            'color-focus': base,
            'color-active': base,
            'color-disabled': base,
            'bg-color': gcv('bg-color-typed-ghost'),
            'bg-color-hover': gcv('bg-color-hover-typed-ghost'),
            'bg-color-focus': gcv('bg-color-focus-typed-ghost'),
            'bg-color-active': gcv('bg-color-active-typed-ghost'),
            'bg-color-disabled': gcv('bg-color-disabled-typed-ghost'),
            'b-color': base,
            'b-color-hover': light2,
            'b-color-focus': light2,
            'b-color-active': dark1,
            'b-color-disabled': gcv('b-color-disabled-typed-ghost'),
            'pulse-s-color': dark1
          })
        }
        if (props.simple) {
          return nh.cvm({
            color: base,
            'color-hover': base,
            'color-focus': gcv('color-focus-typed-simple'),
            'color-active': gcv('color-active-typed-simple'),
            'color-disabled': gcv('color-disabled-typed-simple'),
            'bg-color': opacity8,
            'bg-color-hover': opacity7,
            'bg-color-focus': opacity1,
            'bg-color-active': opacity1,
            'bg-color-disabled': gcv('bg-color-disabled-typed-simple'),
            'b-color': opacity4,
            'b-color-hover': opacity4,
            'b-color-focus': opacity3,
            'b-color-active': opacity3,
            'b-color-disabled': gcv('b-color-disabled-typed-simple'),
            'pulse-s-color': dark1
          })
        }
        if (props.text || props.dashed) {
          return nh.cvm({
            ...(props.dashed
              ? {
                  'b-color': base,
                  'b-color-hover': light2,
                  'b-color-focus': light2,
                  'b-color-active': dark1,
                  'b-color-disabled': gcv('b-color-disabled-typed'),
                  'pulse-s-color': dark1
                }
              : {}),
            color: base,
            'color-hover': light2,
            'color-focus': light2,
            'color-active': dark1,
            'color-disabled': opacity4
          })
        }

        return nh.cvm({
          color: '#fff',
          'color-hover': '#fff',
          'color-focus': '#fff',
          'color-active': '#fff',
          'color-disabled': '#fff',
          'bg-color': base,
          'bg-color-hover': light2,
          'bg-color-focus': light2,
          'bg-color-active': dark1,
          'bg-color-disabled': gcv('bg-color-disabled-typed'),
          'b-color': base,
          'b-color-hover': light2,
          'b-color-focus': light2,
          'b-color-active': dark1,
          'b-color-disabled': gcv('b-color-disabled-typed'),
          'pulse-s-color': dark1
        })
      }

      return {}
    })

    function handleClick(event: MouseEvent) {
      if (props.disabled || props.loading || event.button) return

      if (!props.noPulse) {
        pulsing.value = false
        requestAnimationFrame(() => {
          pulsing.value = true
        })
      }

      emitEvent(props.onClick, event)
    }

    function handleAnimationEnd() {
      pulsing.value = false
    }

    function renderLoadingIcon() {
      return (
        <div class={[nh.be('icon'), nh.bem('icon', 'loading')]}>
          {slots.loading
            ? (
                slots.loading()
              )
            : props.loadingSpin
              ? (
            <Icon spin icon={props.loadingIcon}></Icon>
                )
              : (
            <Icon pulse icon={props.loadingIcon}></Icon>
                )}
        </div>
      )
    }

    function renderSingleIcon() {
      return props.loading
        ? (
            renderLoadingIcon()
          )
        : (
        <div class={nh.be('icon')}>
          {slots.icon ? slots.icon() : props.icon ? <Icon icon={props.icon}></Icon> : null}
        </div>
          )
    }

    function renderCollapseIcon() {
      if (props.icon || slots.icon) {
        return props.loading
          ? (
              renderLoadingIcon()
            )
          : (
          <div class={nh.be('icon')}>
            {slots.icon ? slots.icon() : <Icon icon={props.icon}></Icon>}
          </div>
            )
      }

      return (
        <CollapseTransition appear horizontal fade-effect>
          {props.loading && renderLoadingIcon()}
        </CollapseTransition>
      )
    }

    return () => {
      const Button = (props.tag || 'button') as any

      return (
        <Button
          type={props.buttonType}
          class={className.value}
          role={'button'}
          style={style.value}
          disabled={props.disabled}
          onClick={handleClick}
          onAnimationend={handleAnimationEnd}
        >
          {isIconOnly.value ? renderSingleIcon() : renderCollapseIcon()}
          {!isIconOnly.value && slots.default ? slots.default() : null}
        </Button>
      )
    }
  }
})
