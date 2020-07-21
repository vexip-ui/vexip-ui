<template>
  <Masker
    v-model="currentActive"
    :class="className"
    :inner="inner"
    :transition-name="moveTransition"
    :closable="maskClose"
    :disabled="hideMask"
    @before-close="handleMaskClose"
    @on-hide="handleHidden"
  >
    <template #default="{show}">
      <div
        v-show="show"
        :class="wrapperClass"
        :style="wrapperStyle"
      >
        <div v-if="hasTitle" :class="`${prefix}__title`">
          <slot name="title">
            {{ title }}
          </slot>
          <div
            v-if="closable"
            :class="`${prefix}__close`"
            @click="handleClose()"
          >
            <slot name="close">
              <Icon name="times"></Icon>
            </slot>
          </div>
        </div>
        <div :class="`${prefix}__content`">
          <slot></slot>
        </div>
      </div>
    </template>
  </Masker>
</template>

<script>
import Icon from '../icon'
import Masker from '../masker'
import 'vue-awesome/icons/times'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Drawer',
  components: {
    Icon,
    Masker
  },
  model: {
    prop: 'active',
    event: 'on-toggle'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 280,
      validator(value) {
        return value > 0
      }
    },
    height: {
      type: [Number, String],
      default: 280,
      validator(value) {
        return value > 0
      }
    },
    placement: {
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      }
    },
    title: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    inner: {
      type: Boolean,
      default: false
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    drawerClass: {
      type: [String, Array, Object],
      default: null
    },
    hideMask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-drawer`,
      currentActive: this.active,
      // wrapShow: this.active,
      fadeTrantision: `${prefix}-fade`
    }
  },
  computed: {
    className() {
      const { prefix, inner } = this

      return [
        prefix,
        {
          [`${prefix}--inner`]: inner
        }
      ]
    },
    moveTransition() {
      return `${prefix}-move-${this.placement}`
    },
    wrapperClass() {
      const { prefix, placement, closable, drawerClass } = this

      return [
        `${prefix}__wrapper`,
        `${prefix}__wrapper--${placement}`,
        {
          [`${prefix}__wrapper--closable`]: closable
        },
        drawerClass
      ]
    },
    wrapperStyle() {
      const { placement, width, height } = this

      if (placement === 'top' || placement === 'bottom') {
        return {
          height: height > 100 ? `${height}px` : `${height}%`
        }
      }

      return {
        width: width > 100 ? `${width}px` : `${width}%`
      }
    },
    bindBeforeClose() {
      return !!(
        this._events['before-close'] && this._events['before-close'].length
      )
    },
    hasTitle() {
      return this.$slots.title || this.title
    }
  },
  watch: {
    active(value) {
      this.toggleActive(value)
    },
    currentActive(value) {
      this.$emit('on-toggle', value)
    }
  },
  methods: {
    toggleActive(value) {
      this.currentActive = value
    },
    handleClose(maskCloseFn) {
      const close = () => {
        this.executeClose()
        typeof maskCloseFn === 'function' && maskCloseFn()
      }

      if (this.bindBeforeClose) {
        this.$emit('before-close', close)
      } else {
        close()
      }
    },
    executeClose() {
      this.$nextTick(() => {
        this.toggleActive(false)
        this.$emit('on-close')
      })
    },
    handleMaskClose(maskCloseFn) {
      if (this.maskClose) {
        this.handleClose(maskCloseFn)
      }
    },
    handleHidden() {
      this.$nextTick(() => {
        this.$emit('on-hidden')
      })
    }
  }
}
</script>
