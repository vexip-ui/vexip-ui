<template>
  <Masker
    v-model="currentActive"
    :class="className"
    :inner="inner"
    :transition-name="transitionName"
    :closable="maskClose"
    @before-close="handleMaskClose"
    @on-hide="handleHidden"
  >
    <template #default="{show}">
      <div
        v-show="show"
        :class="wrapperClass"
        :style="wrapperStyle"
      >
        <div v-if="hasTitle" :class="`${prefix}__header`">
          <div
            v-if="closable"
            :class="`${prefix}__close`"
            @click="handleClose()"
          >
            <slot name="close">
              <Icon name="times"></Icon>
            </slot>
          </div>
          <slot name="header">
            <div :class="`${prefix}__title`">
              {{ title }}
            </div>
          </slot>
        </div>
        <div :class="`${prefix}__content`">
          <slot></slot>
        </div>
        <div v-if="!noFooter" :class="`${prefix}__footer`">
          <slot name="footer">
            <Button
              type="text"
              size="small"
              @on-click="handleCancle"
            >
              {{ cancelText }}
            </Button>
            <Button
              type="primary"
              size="small"
              @on-click="handleOk"
            >
              {{ okText }}
            </Button>
          </slot>
        </div>
      </div>
    </template>
  </Masker>
</template>

<script>
import Button from '../button'
import Icon from '../icon'
import Masker from '../masker'

import 'vue-awesome/icons/times'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Modal',
  components: {
    Button,
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
      default: 600
    },
    top: {
      type: [Number, String],
      default: 100
    },
    left: {
      type: [Number, String],
      default: 'auto'
    },
    title: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: true
    },
    inner: {
      type: Boolean,
      default: false
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    modalClass: {
      type: [String, Array, Object],
      default: null
    },
    noFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 根据 inner 判断 寻找最近的定位元素
    const left =
      this.left === 'auto' ? (window.innerWidth - this.width) / 2 : this.left

    return {
      prefix: `${prefix}-modal`,
      currentActive: this.active,
      transitionName: `${prefix}-ease`,
      currentLeft: left
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
    wrapperClass() {
      const { prefix, closable, modalClass } = this

      return [
        `${prefix}__wrapper`,
        {
          [`${prefix}__wrapper--closable`]: closable
        },
        modalClass
      ]
    },
    wrapperStyle() {
      return {
        width: `${this.width}px`,
        top: `${this.top}px`,
        left: `${this.currentLeft}px`
      }
    },
    cancelText() {
      return '取消'
    },
    okText() {
      return '确定'
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
    },
    left() {
      this.computeLeft()
    },
    width() {
      this.computeLeft()
    }
  },
  mounted() {
    this.computeLeft()
  },
  methods: {
    computeLeft() {
      if (this.left === 'auto' && this.inner) {
        let parentNode = this.$el.parentNode

        while (parentNode && parentNode !== document.body) {
          if (getComputedStyle(parentNode).position === 'absolute') {
            this.currentLeft =
              (parentNode.getBoundingClientRect().width - this.width) / 2

            break
          }

          parentNode = parentNode.parentNode
        }
      } else {
        this.currentLeft =
          this.left === 'auto'
            ? (window.innerWidth - this.width) / 2
            : this.left
      }
    },
    toggleActive(value) {
      this.currentActive = value
    },
    handleOk() {
      this.handleClose()
      this.$emit('on-ok')
    },
    handleCancle() {
      this.handleClose()
      this.$emit('on-cancel')
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
    handleHidden() {
      this.$nextTick(() => {
        this.$emit('on-hidden')
      })
    },
    handleMaskClose(maskCloseFn) {
      if (this.maskClose) {
        this.handleClose(maskCloseFn)
      }
    }
  }
}
</script>
