import { defineComponent, computed, h, inject } from 'vue'
import { ROW_GUTTER } from '@/components/row'
import { useConfiguredProps } from '@vexip-ui/config'

import type { CSSProperties } from 'vue'

type LayerProp = 'span' | 'offset' | 'pull' | 'push' | 'order'
type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

const props = useConfiguredProps('column', {
  tag: {
    type: String,
    default: 'div'
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: null
  },
  push: {
    type: Number,
    default: null
  },
  pull: {
    type: Number,
    default: null
  },
  order: {
    type: Number,
    default: null
  },
  xs: {
    type: [Number, Object],
    default: null
  },
  sm: {
    type: [Number, Object],
    default: null
  },
  md: {
    type: [Number, Object],
    default: null
  },
  lg: {
    type: [Number, Object],
    default: null
  },
  xl: {
    type: [Number, Object],
    default: null
  },
  xxl: {
    type: [Number, Object],
    default: null
  },
  flex: {
    type: [Number, String],
    default: null
  }
})

export default defineComponent({
  name: 'Column',
  props,
  setup(props, { slots }) {
    const gutter = inject(ROW_GUTTER, null)

    const prefix = 'vxp-column'

    const className = computed(() => {
      const className = [prefix]
      const colProps: LayerProp[] = ['span', 'offset', 'pull', 'push', 'order']

      colProps.forEach(prop => {
        if (typeof props[prop] === 'number') {
          className.push(
            prop === 'span' ? `${prefix}--${props[prop]}` : `${prefix}--${prop}-${props[prop]}`
          )
        }
      })
      ;(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as BreakPoint[]).forEach(size => {
        if (!props[size] && props[size] !== 0) return

        if (typeof props[size] === 'number') {
          className.push(`${prefix}--${size}-${props[size]}`)
        } else if (typeof props[size] === 'object') {
          colProps.forEach(prop => {
            const value = props[size]?.[prop]

            if (!value && value !== 0) return

            className.push(prop === 'span' ? `${prefix}--${value}` : `${prefix}--${prop}-${value}`)
          })
        }
      })

      return className
    })
    const style = computed(() => {
      const flex = props.flex
      const style: CSSProperties = {}

      if (gutter) {
        if (typeof gutter.value === 'number') {
          style.paddingRight = style.paddingLeft = `${gutter.value / 2}px`
        } else if (Array.isArray(gutter.value)) {
          const [horizontal, vertical] = gutter.value

          style.padding = `${vertical / 2}px ${horizontal / 2}px`
        }
      }

      if (flex) {
        if (typeof flex === 'number') {
          style.flex = `${flex} ${flex} auto`
        } else if (typeof flex === 'string') {
          if (/^\d+\s\d+\s\d+(\w+)?$/.test(flex)) {
            style.flex = flex
          } else {
            style.flex = flex === 'auto' ? '1 1 auto' : `0 0 ${flex}`
          }
        }
      }

      return style
    })

    return () =>
      h(
        props.tag,
        {
          class: className.value,
          style: style.value
        },
        {
          default: () => slots.default && slots.default()
        }
      )
  }
})
