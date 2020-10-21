<template>
  <div :class="className">
    <span v-if="!vertical && hasText" :class="`${prefix}__text`">
      <slot></slot>
    </span>
  </div>
</template>

<script>
const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Divider',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    textPosition: {
      default: 'center',
      validator(value) {
        return ['center', 'left', 'right'].includes(value)
      }
    },
    primary: {
      type: Boolean,
      default: false
    },
    dashed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-divider`
    }
  },
  computed: {
    hasText() {
      return !!this.$slots.default
    },
    className() {
      const { prefix, vertical, primary, dashed, hasText, textPosition } = this

      return [
        prefix,
        `${prefix}--${vertical ? 'vertical' : 'horizontal'}`,
        {
          [`${prefix}--primary`]: !vertical && primary,
          [`${prefix}--dashed`]: dashed,
          [`${prefix}--with-text`]: !vertical && hasText,
          [`${prefix}--with-text-${textPosition}`]:
            !vertical && hasText && textPosition !== 'center'
        }
      ]
    }
  }
}
</script>
