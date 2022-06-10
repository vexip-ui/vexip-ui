import { defineComponent, h, ref, computed, inject } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { useProps, booleanProp, sizeProp, createSizeProp } from '@vexip-ui/config'
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
    tag: String
  },
  emits: ['click'],
  setup(_props, { emit, slots }) {
    const props = useProps('button', _props, {
      size: createSizeProp(),
      type: {
        default: null,
        validator: (value: ButtonType) => buttonTypes.includes(value)
      },
      dashed: false,
      text: false,
      simple: false,
      ghost: false,
      disabled: false,
      loading: false,
      circle: false,
      loadingIcon: Spinner,
      loadingSpin: false,
      icon: null,
      color: null,
      buttonType: {
        default: 'button' as ButtonAttrType,
        validator: (value: ButtonAttrType) => ['button', 'submit', 'reset'].includes(value)
      },
      block: false,
      tag: 'button'
    })

    const groupState = inject(GROUP_STATE, null)

    const prefix = 'vxp-button'
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
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${type.value}`]: type.value !== 'default',
        [`${prefix}--simple`]: !props.ghost && props.simple,
        [`${prefix}--ghost`]: props.ghost,
        [`${prefix}--text`]: props.text,
        [`${prefix}--dashed`]: props.dashed,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--loading`]: props.loading,
        [`${prefix}--circle`]: props.circle,
        [`${prefix}--icon-only`]: isIconOnly.value,
        [`${prefix}--${size.value}`]: size.value !== 'default',
        [`${prefix}--pulsing`]: pulsing.value
      }
    })
    const colorMap = computed(() => {
      if (props.color) {
        const rootStyle = getComputedStyle(document.documentElement)
        const black = parseColorToRgba(rootStyle.getPropertyValue('--vxp-color-black') || '#000')
        const white = parseColorToRgba(rootStyle.getPropertyValue('--vxp-color-white') || '#fff')
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
        const { base, light2, dark1, opacity1, opacity3, opacity4, opacity7, opacity8 } = colorMap.value

        let style: Record<string, string>

        if (props.ghost) {
          style = createVars({
            color: base,
            'color-hover': base,
            'color-focus': base,
            'color-active': base,
            'color-disabled': base,
            'bg-color': 'var(--vxp-button-bg-color-typed-ghost)',
            'bg-color-hover': 'var(--vxp-button-bg-color-hover-typed-ghost)',
            'bg-color-focus': 'var(--vxp-button-bg-color-focus-typed-ghost)',
            'bg-color-active': 'var(--vxp-button-bg-color-active-typed-ghost)',
            'bg-color-disabled': 'var(--vxp-button-bg-color-disabled-typed-ghost)',
            'b-color': base,
            'b-color-hover': light2,
            'b-color-focus': light2,
            'b-color-active': dark1,
            'b-color-disabled': 'var(--vxp-button-b-color-disabled-typed-ghost)',
            'pulse-s-color': dark1
          })
        } else if (props.simple) {
          style = createVars({
            color: base,
            'color-hover': base,
            'color-focus': 'var(--vxp-button-color-focus-typed-simple)',
            'color-active': 'var(--vxp-button-color-active-typed-simple)',
            'color-disabled': 'var(--vxp-button-color-disabled-typed-simple)',
            'bg-color': opacity8,
            'bg-color-hover': opacity7,
            'bg-color-focus': opacity1,
            'bg-color-active': opacity1,
            'bg-color-disabled': 'var(--vxp-button-bg-color-disabled-typed-simple)',
            'b-color': opacity4,
            'b-color-hover': opacity4,
            'b-color-focus': opacity3,
            'b-color-active': opacity3,
            'b-color-disabled': 'var(--vxp-button-b-color-disabled-typed-simple)',
            'pulse-s-color': dark1
          })
        } else if (props.text || props.dashed) {
          style = createVars({
            ...(props.dashed ? {
              'b-color': base,
              'b-color-hover': light2,
              'b-color-focus': light2,
              'b-color-active': dark1,
              'b-color-disabled': 'var(--vxp-button-b-color-disabled-typed)',
              'pulse-s-color': dark1
            }: {}),
            color: base,
            'color-hover': light2,
            'color-focus': light2,
            'color-active': dark1,
            'color-disabled': opacity4
          })
        } else {
          style = createVars({
            color: '#fff',
            'color-hover': '#fff',
            'color-focus': '#fff',
            'color-active': '#fff',
            'color-disabled': '#fff',
            'bg-color': base,
            'bg-color-hover': light2,
            'bg-color-focus': light2,
            'bg-color-active': dark1,
            'bg-color-disabled': 'var(--vxp-button-bg-color-disabled-typed)',
            'b-color': base,
            'b-color-hover': light2,
            'b-color-focus': light2,
            'b-color-active': dark1,
            'b-color-disabled': 'var(--vxp-button-b-color-disabled-typed)',
            'pulse-s-color': dark1
          })
        }

        return style
      }

      return {}
    })

    function createVars(originVars: Record<string, string>) {
      const vars: Record<string, string> = {}

      Object.keys(originVars).forEach(name => {
        vars[`--${prefix}-${name}`] = originVars[name]
      })

      return vars
    }

    function handleClick(event: MouseEvent) {
      if (props.disabled || props.loading || event.button) return

      pulsing.value = false

      requestAnimationFrame(() => {
        pulsing.value = true
      })

      emit('click', event)
    }

    function handleAnimationEnd() {
      pulsing.value = false
    }

    function renderIconWithDefined() {
      return props.loading ? (
        <div class={[`${prefix}__icon`, `${prefix}__icon--loading`]}>
          {slots.loading ? (
            slots.loading()
          ) : props.loadingSpin ? (
            <Icon spin icon={props.loadingIcon}></Icon>
          ) : (
            <Icon pulse icon={props.loadingIcon}></Icon>
          )}
        </div>
      ) : (
        <div class={`${prefix}__icon`}>
          <Icon icon={props.icon}></Icon>
        </div>
      )
    }

    function renderCollapseIcon() {
      return (
        <CollapseTransition appear horizontal fade-effect>
          {props.loading && (
            <div class={[`${prefix}__icon`, `${prefix}__icon--loading`]}>
              {slots.loading ? (
                slots.loading()
              ) : props.loadingSpin ? (
                <Icon spin icon={props.loadingIcon}></Icon>
              ) : (
                <Icon pulse icon={props.loadingIcon}></Icon>
              )}
            </div>
          )}
        </CollapseTransition>
      )
    }

    return () => h(
      props.tag || 'button',
      {
        type: props.buttonType,
        class: className.value,
        style: style.value,
        disabled: props.disabled,
        onClick: handleClick,
        onAnimationend: handleAnimationEnd
      },
      [
        props.icon ? renderIconWithDefined() : renderCollapseIcon(),
        slots.default ? slots.default() : null
      ]
    )
  }
})
