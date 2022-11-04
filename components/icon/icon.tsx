import { defineComponent, h, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { iconProps } from './props'

import type { CSSProperties } from 'vue'

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
      }
    })

    const nh = useNameHelper('icon')

    const computedScale = computed(() => {
      return Number(props.scale) || 1
    })
    const className = computed(() => {
      const spin = props.spin && (props.spin === true || props.spin === 'in' ? 'in' : 'out')
      const pulse = props.pulse === true || props.pulse === 'in' ? 'in' : 'out'

      return {
        [nh.b()]: true,
        [nh.bm(`spin-${spin}`)]: props.spin,
        [nh.bm(`flip-${props.flip}`)]: props.flip,
        [nh.bm(`pulse-${pulse}`)]: props.pulse
      }
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
            <g>{slots.default && slots.default()}</g>
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
