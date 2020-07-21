<template>
  <div :class="className">
    <span>
      <slot></slot>
    </span>
    <div
      v-if="closable"
      :class="`${prefix}__close`"
      @click="handleClose"
    >
      <Icon name="times" :scale="0.8"></Icon>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'
import 'vue-awesome/icons/times'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Tag',
  components: {
    Icon
  },
  props: {
    type: {
      default: 'default',
      validator(value) {
        return ['default', 'primary', 'success', 'error', 'warning'].includes(
          value
        )
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-tag`
    }
  },
  computed: {
    className() {
      const { prefix, type, border } = this

      return {
        [prefix]: true,
        [`${prefix}--${type}`]: type !== 'default',
        [`${prefix}--border`]: border
      }
    }
  },
  methods: {
    handleClose() {
      if (this.closable) {
        this.$emit('on-close')
      }
    }
  }
}
</script>
