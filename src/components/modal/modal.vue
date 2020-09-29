<template>
  <Masker
    v-model="currentActive"
    :class="className"
    :inner="inner"
    :transition-name="transitionName"
    :closable="maskClose"
    :disabled="hideMask"
    :before-close="handleMaskClose"
    @on-show="handleShow"
    @on-hide="handleHide"
  >
    <template #default="{ show }">
      <section
        v-show="show"
        ref="wrapper"
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
            @click="handleClose(false)"
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
              @on-click="handleConfirm"
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
import { isPromise } from '../../utils/common'

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
      default: 100,
      validator(value) {
        return value === 'auto' || typeof value === 'number'
      }
    },
    left: {
      type: [Number, String],
      default: 'auto',
      validator(value) {
        return value === 'auto' || typeof value === 'number'
      }
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
    },
    beforeClose: {
      type: Function,
      default: null
    }
  },
  emits: [
    'on-toggle',
    'on-ok',
    'on-cancel',
    'on-close',
    'on-hide',
    'on-drag-start',
    'on-drag-move',
    'on-drag-end',
    'on-resize-start',
    'on-resize-move',
    'on-resize-end',
    'update:active'
  ],
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

      if (value) {
        this.$nextTick(() => {
          this.computeTop()
          this.computeLeft()
        })
      }
    },
    top() {
      this.computeTop()
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
    this.$nextTick(() => {
      this.computeTop()
      this.computeLeft()
    })
  },
  methods: {
    computeTop() {
      const currentHeight = this.$refs.wrapper.getBoundingClientRect().height

      if (this.top === 'auto' && this.inner) {
        let parentNode = this.$el.parentNode

        while (parentNode && parentNode !== document.body) {
          if (getComputedStyle(parentNode).position !== 'static') {
            this.currentTop =
              (parentNode.getBoundingClientRect().top - currentHeight) / 2

            break
          }

          parentNode = parentNode.parentNode
        }
      } else {
        this.currentTop =
          this.top === 'auto'
            ? (window.innerHeight - currentHeight) / 2 - 20
            : this.top
      }
    },
    computeLeft() {
      if (this.left === 'auto' && this.inner) {
        let parentNode = this.$el.parentNode

        while (parentNode && parentNode !== document.body) {
          if (getComputedStyle(parentNode).position !== 'static') {
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
    handleConfirm() {
      this.handleClose(true)
      this.$emit('on-ok')
    },
    handleCancle() {
      this.handleClose(false)
      this.$emit('on-cancel')
    },
    async handleClose(isConfirm) {
      let result = true

      if (typeof this.beforeClose === 'function') {
        result = this.beforeClose(isConfirm)

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        this.$nextTick(() => {
          this.toggleActive(false)
          this.$emit('on-close')
        })
      }

      return result
    },
    handleShow() {
      this.$emit('on-show')
    },
    handleHide() {
      this.$emit('on-hide')
    },
    handleMaskClose() {
      if (this.maskClose) {
        this.handleClose(false)
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

      this.$emit('on-resize-move', {
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
