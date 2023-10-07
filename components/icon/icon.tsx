import { computed, defineComponent, h } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
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
      flip: {
        default: null,
        validator: value => ['horizontal', 'vertical', 'both'].includes(value)
      },
      effect: null,
      size: null
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
      return Number(props.scale) || 1
    })
    const style = computed<CSSProperties>(() => {
      if (props.size) {
        return { fontSize: props.size }
      }

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
