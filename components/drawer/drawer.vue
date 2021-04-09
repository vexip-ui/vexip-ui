<template>
  <Masker
    v-model="currentActive"
    :class="className"
    :inner="inner"
    :transition-name="moveTransition"
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
        <div
          v-if="resizable"
          :class="[
            `${prefix}__handler`,
            `${prefix}__handler--${placement}`,
            {
              [`${prefix}__handler--resizing`]: resizing
            }
          ]"
          @mousedown="handleResizeStart"
        >
          <slot name="handler"></slot>
        </div>
      </section>
    </template>
  </Masker>
</template>

<script>
import Icon from '../icon'
import Masker from '../masker'
import { useConfigurableProps } from '@/config/properties'
import { isPromise } from '@/utils/common'

import '../../icons/times'

const { prefix } = require('@/style/basis/variable')

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
  },
  beforeClose: {
    type: Function,
    default: null
  },
  resizable: {
    type: Boolean,
    default: false
  }
})

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
  props,
  emits: [
    'on-toggle',
    'on-close',
    'on-show',
    'on-hide',
    'on-resize-start',
    'on-resize-move',
    'on-resize-end',
    'update:active'
  ],
  data() {
    return {
      prefix: `${prefix}-drawer`,
      currentActive: this.active,
      // wrapShow: this.active,
      fadeTrantision: `${prefix}-fade`,
      currentWidth: this.width,
      currentHeight: this.height,
      resizing: false
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
      const { prefix, placement, closable, drawerClass, resizing } = this

      return [
        `${prefix}__wrapper`,
        `${prefix}__wrapper--${placement}`,
        {
          [`${prefix}__wrapper--closable`]: closable,
          [`${prefix}__wrapper--resizing`]: resizing
        },
        drawerClass
      ]
    },
    wrapperStyle() {
      const { placement, currentWidth, currentHeight } = this

      if (placement === 'top' || placement === 'bottom') {
        return {
          height:
            currentHeight > 100 ? `${currentHeight}px` : `${currentHeight}%`
        }
      }

      return {
        width: currentWidth > 100 ? `${currentWidth}px` : `${currentWidth}%`
      }
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
    width(value) {
      this.currentWidth = value
    },
    height(value) {
      this.currentHeight = value
    }
  },
  methods: {
    toggleActive(value) {
      this.currentActive = value
    },
    async handleClose() {
      let result = true

      if (typeof this.beforeClose === 'function') {
        result = this.beforeClose()

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
    handleMaskClose() {
      if (this.maskClose) {
        this.handleClose()
      }
    },
    handleShow() {
      this.$emit('on-show')
    },
    handleHide() {
      this.$emit('on-hide')
    },
    handleResizeStart(event) {
      if (!this.resizable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      this.resizeState = {
        widthStart: this.currentWidth,
        heightStart: this.currentHeight,
        xStart: event.clientX,
        yStart: event.clientY
      }

      document.addEventListener('mousemove', this.handleResizeMove)
      document.addEventListener('mouseup', this.handleResizeEnd)

      this.resizing = true
      this.$emit('on-resize-start')
    },
    handleResizeMove(event) {
      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { widthStart, heightStart, xStart, yStart } = this.resizeState
      const deltaX = xStart - clientX
      const deltaY = yStart - clientY

      switch (this.placement) {
        case 'top': {
          this.currentHeight = heightStart - deltaY
          break
        }
        case 'right': {
          this.currentWidth = widthStart + deltaX
          break
        }
        case 'bottom': {
          this.currentHeight = heightStart + deltaY
          break
        }
        default: {
          this.currentWidth = widthStart - deltaX
        }
      }

      this.currentWidth = Math.max(this.currentWidth, 101)
      this.currentHeight = Math.max(this.currentHeight, 101)

      this.$emit('on-resize-move', {
        width: this.currentWidth,
        height: this.currentHeight
      })
    },
    handleResizeEnd(event) {
      event.stopPropagation()

      document.removeEventListener('mousemove', this.handleResizeMove)
      document.removeEventListener('mouseup', this.handleResizeEnd)

      this.resizing = false
      this.$emit('on-resize-end')
    }
  }
}
</script>
