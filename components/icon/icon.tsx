import { computed, defineComponent, h } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { warnOnce } from '@vexip-ui/utils'
import { iconProps } from './props'

import type { CSSProperties } from 'vue'
import type { IconPresetEffect } from './symbol'

const internalEffects = Object.freeze<IconPresetEffect[]>([
  'spin-in',
  'spin-out',
  'pulse-in',
  'pulse-out'
])

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
      spin: {
        default: false,
        validator: value => typeof value === 'boolean' || value === 'in' || value === 'out'
      },
      pulse: {
        default: false,
        validator: value => typeof value === 'boolean' || value === 'in' || value === 'out'
      },
      flip: {
        default: null,
        validator: value => ['horizontal', 'vertical', 'both'].includes(value)
      },
      effect: null
    })

    if (props.spin) {
      warnOnce(
        "[vexip-ui:Icon] 'spin' prop has been deprecated, please set the 'effect' prop to" +
          " 'spin-in' or 'spin-out' to replace it"
      )
    }

    if (props.pulse) {
      warnOnce(
        "[vexip-ui:Icon] 'pulse' prop has been deprecated, please set the 'effect' prop to" +
          " 'pulse-in' or 'pulse-out' to replace it"
      )
    }

    const nh = useNameHelper('icon')

    const className = computed(() => {
      let effectCls = ''

      if (props.effect) {
        effectCls = internalEffects.includes(props.effect as IconPresetEffect)
          ? nh.bm(props.effect)
          : props.effect
      } else if (props.spin) {
        effectCls = nh.bm(`spin-${props.spin === true || props.spin === 'in' ? 'in' : 'out'}`)
      } else if (props.pulse) {
        effectCls = nh.bm(`pulse-${props.pulse === true || props.pulse === 'in' ? 'in' : 'out'}`)
      }

      return {
        [nh.b()]: true,
        [nh.bm(`flip-${props.flip}`)]: props.flip,
        [effectCls]: effectCls
      }
    })
    const computedScale = computed(() => {
      return Number(props.scale) || 1
    })
    const style = computed<CSSProperties>(() => {
      return computedScale.value === 1 ? {} : { fontSize: `${computedScale.value}em` }
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
