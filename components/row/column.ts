import { defineComponent, computed, h, inject } from 'vue'
import { useProps } from '@vexip-ui/config'
import { ROW_STATE, breakPoints } from './symbol'

import type { PropType, CSSProperties } from 'vue'
import type { ColumnFlex, ColumnOptions } from './symbol'

type LayerProp = 'span' | 'offset' | 'pull' | 'push' | 'order'

const mediaProp = [Number, Object] as PropType<number | ColumnOptions>
const colProps: LayerProp[] = ['span', 'offset', 'pull', 'push', 'order']

export default defineComponent({
  name: 'Column',
  props: {
    tag: String,
    span: Number,
    offset: Number,
    push: Number,
    pull: Number,
    order: Number,
    xs: mediaProp,
    sm: mediaProp,
    md: mediaProp,
    lg: mediaProp,
    xl: mediaProp,
    xxl: mediaProp,
    flex: [Number, String],
    useFlex: {
      type: [Boolean, Object] as PropType<boolean | Partial<ColumnFlex>>,
      default: null
    }
  },
  setup(_props, { slots }) {
    const props = useProps('column', _props, {
      tag: 'div',
      span: {
        default: 24,
        static: true
      },
      offset: {
        default: null,
        static: true
      },
      push: {
        default: null,
        static: true
      },
      pull: {
        default: null,
        static: true
      },
      order: {
        default: null,
        static: true
      },
      xs: {
        default: null,
        static: true
      },
      sm: {
        default: null,
        static: true
      },
      md: {
        default: null,
        static: true
      },
      lg: {
        default: null,
        static: true
      },
      xl: {
        default: null,
        static: true
      },
      xxl: {
        default: null,
        static: true
      },
      flex: {
        default: null,
        static: true
      },
      useFlex: null
    })

    const rowState = inject(ROW_STATE, null)

    const prefix = 'vxp-column'

    const className = computed(() => {
      const columnFlex = (props.useFlex || rowState?.columnFlex) && {
        ...(rowState?.columnFlex || {}),
        ...(
          props.useFlex
            ? props.useFlex === true ? { justify: 'start', align: 'top' } : props.useFlex
            : {}
        )
      }
      const className = [prefix, { [`${prefix}--flex`]: columnFlex }]

      if (columnFlex) {
        className.push(
          `${prefix}--${columnFlex.justify}`,
          `${prefix}--${columnFlex.align}`
        )
      }

      colProps.forEach(prop => {
        if (typeof props[prop] === 'number') {
          className.push(
            prop === 'span' ? `${prefix}--${props[prop]}` : `${prefix}--${prop}-${props[prop]}`
          )
        }
      })

      breakPoints.forEach(size => {
        const sizeProp = props[size]

        if (!sizeProp && sizeProp !== 0) return

        if (typeof sizeProp === 'number') {
          className.push(`${prefix}--${size}-${sizeProp}`)
        } else if (typeof sizeProp === 'object') {
          colProps.forEach(prop => {
            const value = sizeProp[prop]

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

      if (rowState) {
        if (typeof rowState.gutter === 'number') {
          style.paddingRight = style.paddingLeft = `${rowState.gutter / 2}px`
        } else if (Array.isArray(rowState.gutter)) {
          const [horizontal, vertical] = rowState.gutter

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
        props.tag || 'div',
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
