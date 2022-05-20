import { defineComponent, h, ref, computed } from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'
import { iconMap, register } from './register'

import type { PropType, CSSProperties } from 'vue'

const props = useConfiguredProps('icon', {
  name: {
    type: String,
    default: null,
    validator: (value: string) => {
      if (value && iconMap.has(value)) {
        return true
      }

      console.warn(`
        [Vexip warn] prop 'name' is referring to an unregistered icon '${value}'
      `)

      return false
    }
  },
  icon: {
    type: Object,
    default: null
  },
  scale: {
    type: [Number, String] as PropType<number | string>,
    default: 1
  },
  title: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  spin: {
    type: [Boolean, String] as PropType<boolean | 'in' | 'out'>,
    default: false,
    validator: (value: boolean | string) => {
      return typeof value === 'boolean' || value === 'in' || value === 'out'
    }
  },
  pulse: {
    type: [Boolean, String] as PropType<boolean | 'in' | 'out'>,
    default: false,
    validator: (value: boolean | string) => {
      return typeof value === 'boolean' || value === 'in' || value === 'out'
    }
  },
  flip: {
    type: String as PropType<'horizontal' | 'vertical' | 'both'>,
    default: null,
    validator: (value: string) => {
      return ['horizontal', 'vertical', 'both'].includes(value)
    }
  }
})

export default defineComponent({
  name: 'Icon',
  register,
  props,
  setup(props, { attrs, slots }) {
    const prefix = 'vxp-icon'
    const childrenWidth = ref(0)
    const childrenHeight = ref(0)

    const computedScale = computed(() => {
      return (Number(props.scale) || 1)
    })
    const className = computed(() => {
      const spin = props.spin && (props.spin === true || props.spin === 'in' ? 'in' : 'out')
      const pulse = props.pulse === true || props.pulse === 'in' ? 'in' : 'out'

      return {
        [prefix]: true,
        [`${prefix}--spin-${spin}`]: props.spin,
        [`${prefix}--flip-${props.flip}`]: props.flip,
        [`${prefix}--pulse-${pulse}`]: props.pulse
      }
    })
    const icon = computed(() => {
      return props.name ? iconMap.get(props.name) : null
    })
    const ratio = computed(() => {
      if (!icon.value) return 1

      const { width, height } = icon.value

      return Math.max(width, height) / 16
    })
    const width = computed(() => {
      return (
        childrenWidth.value ||
        (icon.value && (icon.value.width / ratio.value) * computedScale.value) ||
        0
      )
    })
    const height = computed(() => {
      return (
        childrenHeight.value ||
        (icon.value && (icon.value.height / ratio.value) * computedScale.value) ||
        0
      )
    })
    const style = computed<CSSProperties>(() => {
      return computedScale.value === 1
        ? {}
        : { fontSize: `${1 * computedScale.value}em` }
    })
    const viewBox = computed(() => {
      return icon.value
        ? `0 0 ${icon.value.width} ${icon.value.height}`
        : `0 0 ${width.value} ${height.value}`
    })

    return () => {
      const iAttrs = {
        class: className.value,
        style: style.value,
        role: attrs.role as string || (props.label || props.title ? 'img' : undefined),
        'aria-label': props.label,
        'aria-hidden': !(props.label || props.title),
      }

      if (slots.default) {
        return (<i{...iAttrs}>{slots.default && slots.default()}</i>)
      } else if (!props.name && !props.icon) {
        return (<i {...iAttrs}></i>)
      }

      if (props.name) {
        const content = props.title ? [(<title>{props.title}</title>)] : []

        return (
          <i {...iAttrs}>
            <svg viewBox={viewBox.value}>
              {...content}
              {icon.value
                ? icon.value.paths
                    .map((path, index) => <path {...path} key={index}></path>)
                    .concat(
                      icon.value.polygons.map((polygon, index) => (
                        <polygon {...polygon} key={index}></polygon>
                      ))
                    )
                : []}
            </svg>
          </i>
        )
      } else {
        return (<i {...iAttrs}>{h(props.icon)}</i>)
      }
    }
  }
})
