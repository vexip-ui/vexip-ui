<template>
  <transition :name="transitionName">
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
  </transition>
</template>

<script>
import Icon from '../icon'
import { useConfigurableProps } from '../../src/config/properties'
import '../../icons/times'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
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
})

export default {
  name: 'Tag',
  components: {
    Icon
  },
  props,
  emits: ['on-close'],
  data() {
    return {
      prefix: `${prefix}-tag`,
      transitionName: `${prefix}-fade`
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
