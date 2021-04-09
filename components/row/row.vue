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
import { useConfigurableProps } from '@/config/properties'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: [Number, Array],
    default: 0
  },
  justify: {
    default: 'start',
    validator(value) {
      return [
        'start',
        'end',
        'center',
        'space-around',
        'space-between'
      ].includes(value)
    }
  },
  align: {
    default: 'top',
    validator(value) {
      return ['top', 'middle', 'bottom'].includes(value)
    }
  }
})

export default {
  name: 'Row',
  props,
  data() {
    return {
      prefix: `${prefix}-row`,
      items: []
    }
  },
  computed: {
    className() {
      const { prefix, justify, align } = this

      return [prefix, `${prefix}--${justify}`, `${prefix}--${align}`]
    },
    style() {
      if (!this.gutter) return null

      if (typeof this.gutter === 'number') {
        const horizontalMargin = `-${this.gutter / 2}px`

        return {
          marginRight: horizontalMargin,
          marginLeft: horizontalMargin
        }
      }

      if (Array.isArray(this.gutter)) {
        const [horizontal, vertical] = this.gutter
        const horizontalMargin = `-${horizontal / 2}px`
        const verticalMargin = `${vertical / 2}px`

        return {
          margin: `-${verticalMargin} ${horizontalMargin} ${verticalMargin}`
        }
      }

      return null
    }
  }
}
</script>
