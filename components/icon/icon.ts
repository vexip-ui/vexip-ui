import { defineComponent, h, ref, computed } from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'

import type { PropType } from 'vue'

export interface IconOptions {
  width: number,
  height: number,
  d?: string,
  points?: string,
  paths?: ({ d: string } & Record<string, any>)[],
  polygons?: ({ points: string } & Record<string, any>)[]
}

const iconMap: Map<string, Required<Omit<IconOptions, 'd' | 'points'>>> = new Map()

export const register = (icons: Record<string, IconOptions>) => {
  Object.keys(icons).forEach(name => {
    if (iconMap.has(name)) return

    const icon = icons[name]
    const { paths = [], polygons = [], d, points, width, height } = icon

    if (d) {
      paths.push({ d })
    }

    if (points) {
      polygons.push({ points })
    }

    iconMap.set(name, { paths, polygons, width, height })
  })
}

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
    type: [Boolean, String],
    default: false,
    validator: (value: boolean | string) => {
      return typeof value === 'boolean' || value === 'in' || value === 'out'
    }
  },
  pulse: {
    type: [Boolean, String],
    default: false,
    validator: (value: boolean | string) => {
      return typeof value === 'boolean' || value === 'in' || value === 'out'
    }
  },
  flip: {
    type: String,
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
    const svgX = ref(null)
    const svgY = ref(null)
    const childrenWidth = ref(0)
    const childrenHeight = ref(0)
    const outerScale = ref(0.9) // 原图标偏大, 缩小一点

    const computedScale = computed(() => {
      return (Number(props.scale) || 1) * outerScale.value
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
    // const style = computed(() => {
    //   return computedScale.value === 1
    //     ? null
    //     : { fontSize: `${1 * computedScale.value}em` }
    // })
    const viewBox = computed(() => {
      return icon.value
        ? `0 0 ${icon.value.width} ${icon.value.height}`
        : `0 0 ${width.value} ${height.value}`
    })

    return () => {
      if (!props.name) return h('svg')

      const svgAttrs = {
        class: className.value,
        // style: style.value,
        role: attrs.role || (props.label || props.title ? 'img' : null),
        'aria-label': props.label,
        'aria-hidden': !(props.label || props.title),
        viewBox: viewBox.value,
        x: svgX.value,
        y: svgY.value,
        width: width.value,
        height: height.value
      }

      const content = props.title ? [h('title', props.title)] : []

      return h(
        'svg',
        svgAttrs,
        content.concat([
          h(
            'g',
            slots.default
              ? slots.default()
              : icon.value
                ? icon.value.paths
                  .map((path, index) => h('path', { ...path, key: index }))
                  .concat(
                    icon.value.polygons.map((polygon, index) =>
                      h('polygon', { ...polygon, key: index })
                    )
                  )
                : []
          )
        ])
      )
    }
  }
})
