<template>
  <Masker
    v-model="currentActive"
    :class="className"
    :inner="inner"
    :transition-name="transitionName"
    :closable="maskClose"
    :disabled="hideMask"
    :before-close="handleMaskClose"
    :transfer="transfer"
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
          ref="header"
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
          :class="`${prefix}__content`"
          :style="{
            overflow: resizeState ? 'hidden' : null
          }"
        >
          <slot></slot>
        </div>
        <div
          v-if="!noFooter"
          ref="footer"
          :class="`${prefix}__footer`"
        >
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
              :loading="loading"
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
import { config, useConfigurableProps } from '@/config/properties'
import { isPromise } from '@/utils/common'

import '../../icons/times'

const prefix = config.defaults.prefixCls

// FIXME: 点击遮罩关闭时未触发 before-close 或未正确执行

const props = useConfigurableProps({
  transfer: {
    type: [Boolean, String],
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: 600
  },
  height: {
    type: [Number, String],
    default: 'auto'
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
  right: {
    type: [Number, String],
    default: 'auto',
    validator(value) {
      return value === 'auto' || typeof value === 'number'
    }
  },
  bottom: {
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
  },
  loading: {
    type: Boolean,
    default: false
  },
  minWidth: {
    type: Number,
    default: 150
  },
  minHeight: {
    type: Number,
    default: 120
  }
})

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
  props,
  emits: [
    'on-toggle',
    'on-ok',
    'on-cancel',
    'on-close',
    'on-show',
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
      currentHeight: this.height,
      resizeState: {}
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
      const { currentTop, currentLeft, currentWidth, currentHeight, right, bottom } = this
      const fixedHeight = currentHeight !== 'auto'

      return {
        top: `${currentTop}px`,
        right: fixedHeight || !right || right === 'auto' ? null : `${right}px`,
        bottom: fixedHeight || !bottom || bottom === 'auto' ? null : `${bottom}px`,
        left: `${currentLeft}px`,
        width: `${currentWidth}px`,
        height: fixedHeight ? `${this.currentHeight}px` : null
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
        let parentNode = this.$el

        while (parentNode && parentNode !== document.body) {
          parentNode = parentNode.parentNode

          if (getComputedStyle(parentNode).position !== 'static') {
            this.currentTop =
              (parentNode.getBoundingClientRect().top - currentHeight) / 2

            break
          }
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

      this.$emit('on-drag-end', {
        top: this.currentTop,
        left: this.currentLeft
      })
    },
    handleResizeStart(event) {
      if (!this.resizable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      let heightStart
      let minHeight = 32

      if (this.currentHeight === 'auto') {
        heightStart = this.$refs.wrapper.offsetHeight
      } else {
        heightStart = this.currentHeight
      }

      if (this.$refs.header) {
        minHeight += this.$refs.header.offsetHeight
      }

      if (this.$refs.footer) {
        minHeight += this.$refs.footer.offsetHeight
      }

      this.resizeState = {
        heightStart,
        minHeight: Math.max(minHeight, this.minHeight),
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
      const { widthStart, heightStart, minHeight, xStart, yStart } = this.resizeState

      this.currentWidth = Math.max(this.minWidth, widthStart - xStart + clientX)
      this.currentHeight = Math.max(minHeight, heightStart - yStart + clientY)

      this.$emit('on-resize-move', {
        width: this.currentWidth,
        height: this.currentHeight
      })
    },
    handleResizeEnd(event) {
      event.stopPropagation()

      document.removeEventListener('mousemove', this.handleResizeMove)
      document.removeEventListener('mouseup', this.handleResizeEnd)

      this.$emit('on-resize-end', {
        width: this.currentWidth,
        height: this.currentHeight
      })
    }
  }
}
</script>
