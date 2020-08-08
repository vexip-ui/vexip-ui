<template>
  <a
    :class="className"
    :href="to"
    :target="target"
    @click="handleClick"
  >
    <slot name="icon">
      <Icon
        v-if="icon"
        :class="`${prefix}__icon`"
        :name="icon"
      ></Icon>
    </slot>
    <slot></slot>
  </a>
</template>

<script>
import Icon from '../icon'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Linker',
  components: {
    Icon
  },
  props: {
    to: {
      type: String,
      default: null
    },
    type: {
      default: 'default',
      validator(value) {
        return [
          'default',
          'primary',
          'success',
          'error',
          'warning',
          'info'
        ].includes(value)
      }
    },
    icon: {
      type: String,
      default: ''
    },
    underline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: '_blank'
    }
  },
  data() {
    return {
      prefix: `${prefix}-linker`
    }
  },
  computed: {
    className() {
      const { prefix, type, disabled, underline } = this

      return {
        [prefix]: true,
        [`${prefix}--${type}`]: type !== 'defalut',
        [`${prefix}--disabled`]: disabled,
        [`${prefix}--underline`]: underline
      }
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('on-click', event)
    }
  }
}
</script>
