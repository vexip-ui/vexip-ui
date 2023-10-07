import { computed, defineComponent, h } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { toNumber } from '@vexip-ui/utils'
import { iconProps } from './props'

import type { CSSProperties } from 'vue'
import type { IconPresetEffect } from './symbol'

const internalEffects = Object.freeze<IconPresetEffect[]>([
  'spin-in',
  'spin-out',
  'pulse-in',
  'pulse-out'
])

const angleRE = /(^\s*[+-]?\d*\.?\d+\s*)(deg|grad|turn|rad)?\s*/i

export default defineComponent({
  name: 'Icon',
  props: iconProps,
  setup(_props, { attrs, slots }) {
    const props = useProps('icon', _props, {
      icon: {
        default: null,
        static: true
      },
      scale: 1,
      title: null,
      label: null,
      flip: {
        default: null,
        validator: value => ['horizontal', 'vertical', 'both'].includes(value)
      },
      effect: null,
      size: null,
      color: null,
      rotate: null
    })

    const nh = useNameHelper('icon')

    const className = computed(() => {
      let effectCls = ''

      if (props.effect) {
        effectCls = internalEffects.includes(props.effect as IconPresetEffect)
          ? nh.bm(props.effect)
          : props.effect
      }

      return {
        [nh.b()]: true,
        [nh.bm(`flip-${props.flip}`)]: props.flip,
        [effectCls]: effectCls
      }
    })
    const computedScale = computed(() => {
      return toNumber(props.scale) || 1
    })
    const rotate = computed(() => {
      if (typeof props.rotate === 'number') {
        return `${(props.rotate % 4) / 4}turn`
      }

      const matched = props.rotate?.match(angleRE)

      if (!matched) return null

      const number = toNumber(matched[1])

      if (!matched[2]) {
        return `${(number % 4) / 4}turn`
      }

      return number ? `${number}${matched[2]}` : null
    })
    const style = computed(() => {
      const style: CSSProperties = {
        color: props.color
      }

      if (props.size) {
        style.fontSize = props.size
      } else if (computedScale.value !== 1) {
        style.fontSize = `${computedScale.value}em`
      }

      if (rotate.value) {
        style[nh.cv('rotate')] = rotate.value
      }

      return style
    })

    return () => {
      const iAttrs = {
        class: className.value,
        style: style.value,
        title: props.title,
        role: (attrs.role as string) || (props.label || props.title ? 'img' : undefined),
        'aria-label': props.label,
        'aria-hidden': !(props.label || props.title)
      }

      if (slots.default) {
        return (
          <i {...iAttrs}>
            <g>{slots.default()}</g>
          </i>
        )
      }

      if (props.icon) {
        return (
          <i {...iAttrs}>
            <g>{h(props.icon)}</g>
          </i>
        )
      }

      return <i {...iAttrs}></i>
    }
  }
})
