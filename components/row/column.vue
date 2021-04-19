<template>
  <component
    :is="tag"
    :class="className"
    :style="style"
  >
    <slot></slot>
  </component>
</template>

<script>
import { config, useConfigurableProps } from '../../src/config/properties'
import { findComponentUpward, removeArrayItem } from '../../src/utils/common'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
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

export default {
  name: 'Column',
  props,
  data() {
    return {
      prefix: `${prefix}-column`,
      parentInstance: null
    }
  },
  computed: {
    gutter() {
      return this.parentInstance ? this.parentInstance.gutter : 0
    },
    className() {
      const prefix = this.prefix
      const className = [this.prefix]
      const props = ['span', 'offset', 'pull', 'push', 'order']

      props.forEach(prop => {
        if (typeof this[prop] === 'number') {
          className.push(
            prop === 'span'
              ? `${prefix}--${this[prop]}`
              : `${prefix}--${prop}-${this[prop]}`
          )
        }
      })
      ;['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        if (!this[size] && this[size] !== 0) return

        if (typeof this[size] === 'number') {
          className.push(`${prefix}--${size}-${this[size]}`)
        } else if (typeof this[size] === 'object') {
          props.forEach(prop => {
            const value = this[size][prop]

            if (!value && value !== 0) return

            className.push(
              prop === 'span'
                ? `${prefix}--${value}`
                : `${prefix}--${prop}-${value}`
            )
          })
        }
      })

      return className
    },
    style() {
      const { gutter, flex } = this
      const style = {}

      if (gutter) {
        if (typeof gutter === 'number') {
          style.paddingRight = style.paddingLeft = `${gutter / 2}px`
        } else if (Array.isArray(gutter)) {
          const [horizontal, vertical] = gutter

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
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, 'Row')

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      removeArrayItem(this.parentInstance.items, this)
    }
  }
}
</script>
