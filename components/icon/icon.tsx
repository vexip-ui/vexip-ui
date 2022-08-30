import { defineComponent, h, ref, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { iconMap, register } from './register'

import type { PropType, CSSProperties } from 'vue'

const inOutProp = {
  type: [Boolean, String] as PropType<boolean | 'in' | 'out'>,
  default: null
}

export default defineComponent({
  name: 'Icon',
  register,
  props: {
    name: String,
    icon: Object,
    scale: [Number, String] as PropType<number | string>,
    title: String,
    label: String,
    spin: inOutProp,
    pulse: inOutProp,
    flip: String as PropType<'horizontal' | 'vertical' | 'both'>
  },
  setup(_props, { attrs, slots }) {
    const props = useProps('icon', _props, {
      name: {
        default: null,
        validator: (value: string) => {
          console.warn("[vexip-ui:Icon] prop 'name' has been deprecated, use 'icon' instead it.")

          if (value && iconMap.has(value)) {
            return true
          }

          console.warn(
            `[vexip-ui:Icon] prop 'name' is referring to an unregistered icon '${value}'.`
          )

          return false
        },
        static: true
      },
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
    const childrenWidth = ref(0)
    const childrenHeight = ref(0)

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
      return computedScale.value === 1 ? {} : { fontSize: `${computedScale.value}em` }
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

      if (props.name) {
        const content = props.title ? [<title>{props.title}</title>] : []

        return (
          <i {...iAttrs}>
            <g>
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
            </g>
          </i>
        )
      }

      return <i {...iAttrs}></i>
    }
  }
})
