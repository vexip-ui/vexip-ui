<template>
  <div v-show="wrapShow" :class="className">
    <transition
      v-if="!disabled"
      :name="maskTransition"
      @after-leave="afterClose"
    >
      <div
        v-show="currentActive"
        :class="`${prefix}__mask`"
        @click="handleMaskClose"
      ></div>
    </transition>
    <transition :name="transitionName">
      <slot :show="currentActive"></slot>
    </transition>
  </div>
</template>

<script>
const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Masker',
  model: {
    prop: 'active',
    event: 'on-toggle'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    inner: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: `${prefix}-fade`
    },
    transitionName: {
      type: String,
      default: `${prefix}-fade`
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-masker`,
      currentActive: this.active,
      wrapShow: this.active
    }
  },
  computed: {
    className() {
      const { prefix, inner, disabled } = this

      return [
        prefix,
        {
          [`${prefix}--inner`]: inner,
          [`${prefix}--disabled`]: disabled
        }
      ]
    },
    bindBeforeClose() {
      return !!(
        this._events['before-close'] && this._events['before-close'].length
      )
    }
  },
  watch: {
    active(value) {
      this.currentActive = value

      if (value) {
        this.wrapShow = value
      }
    },
    currentActive(value) {
      this.$emit('on-toggle', value)
    }
  },
  methods: {
    toggleActive(value) {
      this.currentActive = value
    },
    handleClose() {
      if (this.bindBeforeClose) {
        this.$emit('before-close', this.executeClose)
      } else {
        this.executeClose()
      }
    },
    executeClose() {
      this.$nextTick(() => {
        this.toggleActive(false)
        this.$emit('on-close')
      })
    },
    handleMaskClose() {
      if (this.closable) {
        this.handleClose()
      }
    },
    afterClose() {
      this.$nextTick(() => {
        this.wrapShow = false
        this.$emit('on-hide')
      })
    }
  }
}
</script>
