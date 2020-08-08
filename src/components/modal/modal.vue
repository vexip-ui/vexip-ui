<template>
  <Masker
    v-model="currentActive"
    :class="className"
    :inner="inner"
    :transition-name="transitionName"
    :closable="maskClose"
    :disabled="hideMask"
    @before-close="handleMaskClose"
    @on-hide="handleHidden"
  >
    <template #default="{ show }">
      <section
        v-show="show"
        :class="wrapperClass"
        :style="wrapperStyle"
      >
        <div
          v-if="hasTitle"
          :class="`${prefix}__header`"
          @mousedown="handleDragStart"
        >
          <div
            v-if="closable"
            :class="`${prefix}__close`"
            @mousedown.stop
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
        <div
          ref="content"
          :class="`${prefix}__content`"
          :style="contentStyle"
        >
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
        <div
          v-if="resizable"
          :class="`${prefix}__resizer`"
          @mousedown="handleResizeStart"
        ></div>
      </section>
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
      type: Number,
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
    },
    hideMask: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-modal`,
      currentActive: this.active,
      transitionName: `${prefix}-ease`,
      currentTop: this.top,
      currentLeft: this.left,
      currentWidth: this.width,
      contentHeight: 'auto'
    }
  },
  computed: {
    className() {
      const { prefix, inner, draggable, resizable } = this

      return [
        prefix,
        {
          [`${prefix}--inner`]: inner,
          [`${prefix}--draggable`]: draggable,
          [`${prefix}--resizable`]: resizable
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
        top: `${this.currentTop}px`,
        left: `${this.currentLeft}px`,
        width: `${this.currentWidth}px`
      }
    },
    contentStyle() {
      const { contentHeight } = this

      if (contentHeight === 'auto') {
        return null
      }

      return {
        height: `${contentHeight}px`,
        overflow: 'hidden'
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
    top(value) {
      this.currentTop = value
    },
    left() {
      this.computeLeft()
    },
    width(value) {
      this.currentWidth = value
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
              (parentNode.getBoundingClientRect().width - this.currentWidth) / 2

            break
          }

          parentNode = parentNode.parentNode
        }
      } else {
        this.currentLeft =
          this.left === 'auto'
            ? (window.innerWidth - this.currentWidth) / 2
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
    },
    handleDragStart(event) {
      if (!this.draggable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      this.dragState = {
        topStart: this.currentTop,
        leftStart: this.currentLeft,
        xStart: event.clientX,
        yStart: event.clientY
      }

      document.addEventListener('mousemove', this.handleDragMove)
      document.addEventListener('mouseup', this.handleDragEnd)

      this.$emit('on-drag-start')
    },
    handleDragMove(event) {
      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { topStart, leftStart, xStart, yStart } = this.dragState

      this.currentTop = topStart - yStart + clientY
      this.currentLeft = leftStart - xStart + clientX

      this.$emit('on-drag-move', {
        top: this.currentTop,
        left: this.currentLeft
      })
    },
    handleDragEnd(event) {
      event.stopPropagation()

      document.removeEventListener('mousemove', this.handleDragMove)
      document.removeEventListener('mouseup', this.handleDragEnd)

      this.$emit('on-drag-end')
    },
    handleResizeStart(event) {
      if (!this.resizable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      let heightStart

      if (this.contentHeight === 'auto') {
        heightStart = this.$refs.content.getBoundingClientRect().height
      } else {
        heightStart = this.contentHeight
      }

      this.resizeState = {
        heightStart,
        widthStart: this.currentWidth,
        xStart: event.clientX,
        yStart: event.clientY
      }

      document.addEventListener('mousemove', this.handleResizeMove)
      document.addEventListener('mouseup', this.handleResizeEnd)

      this.$emit('on-resize-start')
    },
    handleResizeMove(event) {
      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { widthStart, heightStart, xStart, yStart } = this.resizeState

      this.currentWidth = Math.max(150, widthStart - xStart + clientX)
      this.contentHeight = heightStart - yStart + clientY

      this.$emit('on-drag-move', {
        width: this.currentWidth,
        height: this.contentHeight
      })
    },
    handleResizeEnd(event) {
      event.stopPropagation()

      document.removeEventListener('mousemove', this.handleResizeMove)
      document.removeEventListener('mouseup', this.handleResizeEnd)

      this.$emit('on-resize-end')
    }
  }
}
</script>
