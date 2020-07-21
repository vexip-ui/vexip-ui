<template>
  <div :class="className">
    <slot></slot>
    <transition :name="transitionName">
      <sup
        v-show="!disabled && (content || content === 0 || isDot)"
        :class="{
          [`${prefix}__content`]: true,
          [`${prefix}__content--fixed`]: hasSlot,
          [`${prefix}__content--click`]: bindClick,
          [`${prefix}__content--${type}`]: type !== 'error'
        }"
        :style="{backgroundColor: color}"
        :title="content"
        @click="handleClick"
      >
        <slot name="content">
          {{ renderContent }}
        </slot>
      </sup>
    </transition>
  </div>
</template>

<script>
const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Badge',
  props: {
    content: {
      type: [Number, String],
      default: null
    },
    max: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isDot: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'error',
      validator(value) {
        return [
          'error',
          'primary',
          'success',
          'warning',
          'info',
          'disabled'
        ].includes(value)
      }
    },
    color: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      prefix: `${prefix}-badge`
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default
    },
    className() {
      const { prefix, hasSlot, isDot } = this

      return {
        [prefix]: true,
        [`${prefix}--not-wrapper`]: !hasSlot,
        [`${prefix}--is-dot`]: isDot
      }
    },
    renderContent() {
      if (this.isDot) return null

      const { content, max } = this

      if (typeof content === 'number' && max) {
        return content > max ? `${max}+` : content
      }

      return content
    },
    bindClick() {
      return !!(
        this._events['on-badge-click'] && this._events['on-badge-click'].length
      )
    },
    transitionName() {
      return this.hasSlot ? `${prefix}-badge-zoom` : `${prefix}-zoom`
    }
  },
  methods: {
    handleClick() {
      this.$emit('on-badge-click')
    }
  }
}
</script>
