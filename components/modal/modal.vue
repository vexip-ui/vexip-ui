<template>
  <Masker
    v-model:active="currentActive"
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
            overflow: resizing ? 'hidden' : undefined
          }"
        >
          <slot></slot>
        </div>
        <div v-if="!noFooter" ref="footer" :class="`${prefix}__footer`">
          <slot name="footer">
            <Button type="text" size="small" @on-click="handleCancle">
              {{ cancelText || locale.cancel }}
            </Button>
            <Button
              type="primary"
              size="small"
              :loading="loading"
              @on-click="handleConfirm"
            >
              {{ confirmText || locale.confirm }}
            </Button>
          </slot>
        </div>
        <div v-if="resizable" :class="`${prefix}__resizer`" @mousedown="handleResizeStart"></div>
      </section>
    </template>
  </Masker>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { useConfiguredProps } from '@/common/config/install'
import { useLocaleConfig } from '@/common/config/locale'
import { isPromise } from '@/common/utils/common'
import { toNumber } from '@/common/utils/number'

import '@/common/icons/times'

import type { PropType } from 'vue'

type ClassType = string | Record<string, boolean>

const positionType = [Number, String]
const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}

const props = useConfiguredProps('modal', {
  transfer: {
    type: [Boolean, String],
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  width: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
  },
  height: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
  },
  top: {
    type: positionType,
    default: 100,
    validator: positionValidator
  },
  left: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
  },
  right: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
  },
  bottom: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
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
    type: [String, Object] as PropType<ClassType>,
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
    type: Function as PropType<(isConfirm: boolean) => unknown>,
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
  },
  transitionName: {
    type: String,
    default: 'vxp-ease'
  },
  confirmText: {
    type: String,
    default: null
  },
  cancelText: {
    type: String,
    default: null
  }
})

export default defineComponent({
  name: 'Modal',
  components: {
    Button,
    Icon,
    Masker
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
  setup(props, { slots, emit }) {
    const prefix = 'vxp-modal'
    const currentActive = ref(props.active)
    const currentTop = ref(toNumber(props.top))
    const currentLeft = ref(toNumber(props.left))
    const currentWidth = ref<'auto' | number>(normalizeStyleLength(props.width))
    const currentHeight = ref<'auto' | number>(normalizeStyleLength(props.height))
    const resizing = ref(false)

    let hasComputedTop = false
    let hasComputedLeft = false

    const wrapper = ref<HTMLElement | null>(null)
    const header = ref<HTMLElement | null>(null)
    const footer = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return [
        prefix,
        {
          [`${prefix}--inner`]: props.inner,
          [`${prefix}--draggable`]: props.draggable,
          [`${prefix}--resizable`]: props.resizable
        }
      ]
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}__wrapper`,
        {
          [`${prefix}__wrapper--closable`]: props.closable
        },
        props.modalClass
      ]
    })
    const wrapperStyle = computed(() => {
      const fixedHeight = currentHeight.value !== 'auto'

      return {
        top: `${currentTop.value}px`,
        right:
          fixedHeight || !props.right || props.right === 'auto' ? undefined : `${props.right}px`,
        bottom:
          fixedHeight || !props.bottom || props.bottom === 'auto' ? undefined : `${props.bottom}px`,
        left: `${currentLeft.value}px`,
        width: `${currentWidth.value}px`,
        height: fixedHeight ? `${currentHeight.value}px` : undefined
      }
    })
    const hasTitle = computed(() => {
      return !!(slots.title || props.title)
    })

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(currentActive, value => {
      emit('on-toggle', value)
      emit('update:active', value)

      if (value) {
        nextTick(() => {
          computeTop()
          computeLeft()
        })
      }
    })
    watch(
      () => props.top,
      () => {
        hasComputedTop = false
        currentActive.value && computeTop()
      }
    )
    watch(
      () => props.left,
      () => {
        hasComputedLeft = false
        currentActive.value && computeLeft()
      }
    )
    watch(
      () => props.width,
      value => {
        currentWidth.value = normalizeStyleLength(value)
        computeLeft()
      }
    )
    watch(
      () => props.height,
      value => {
        currentHeight.value = normalizeStyleLength(value)
        computeTop()
      }
    )

    onMounted(() => {
      nextTick(() => {
        if (currentActive.value) {
          computeTop()
          computeLeft()
        }
      })
    })

    function normalizeStyleLength(value: string | number) {
      return value === 'auto' ? 'auto' : toNumber(value)
    }

    function computeTop() {
      if (!wrapper.value || hasComputedTop) return

      const currentHeight = wrapper.value.getBoundingClientRect().height

      if (props.top === 'auto' && props.inner) {
        let parentElement = wrapper.value.parentElement

        while (parentElement && parentElement !== document.body) {
          if (getComputedStyle(parentElement).position !== 'static') {
            currentTop.value = (parentElement.getBoundingClientRect().height - currentHeight) / 2

            break
          }

          parentElement = parentElement.parentElement
        }
      } else {
        currentTop.value =
          props.top === 'auto' ? (window.innerHeight - currentHeight) / 2 - 20 : toNumber(props.top)
      }

      hasComputedTop = true
    }

    function computeLeft() {
      if (!wrapper.value || hasComputedLeft) return

      const currentWidth = wrapper.value.getBoundingClientRect().width

      if (props.left === 'auto' && props.inner) {
        let parentElement = wrapper.value.parentElement

        while (parentElement && parentElement !== document.body) {
          if (getComputedStyle(parentElement).position !== 'static') {
            currentLeft.value = (parentElement.getBoundingClientRect().width - currentWidth) / 2

            break
          }

          parentElement = parentElement.parentElement
        }
      } else {
        currentLeft.value =
          props.left === 'auto' ? (window.innerWidth - currentWidth) / 2 : toNumber(props.left)
      }

      hasComputedLeft = true
    }

    function handleConfirm() {
      handleClose(true)
      emit('on-ok')
    }

    function handleCancle() {
      handleClose(false)
      emit('on-cancel')
    }

    async function handleClose(isConfirm: boolean) {
      let result: unknown = true

      if (typeof props.beforeClose === 'function') {
        result = props.beforeClose(isConfirm)

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        nextTick(() => {
          currentActive.value = false
          emit('on-close')
        })
      }

      return result
    }

    function handleShow() {
      emit('on-show')
    }

    function handleHide() {
      emit('on-hide')
    }

    function handleMaskClose() {
      if (props.maskClose) {
        handleClose(false)
      }
    }

    let dragState: {
      topStart: number,
      leftStart: number,
      xStart: number,
      yStart: number
    } | null = null

    function handleDragStart(event: MouseEvent) {
      if (!props.draggable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      dragState = {
        topStart: currentTop.value,
        leftStart: currentLeft.value,
        xStart: event.clientX,
        yStart: event.clientY
      }

      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)

      emit('on-drag-start')
    }

    function handleDragMove(event: MouseEvent) {
      if (!dragState) return

      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { topStart, leftStart, xStart, yStart } = dragState

      currentTop.value = topStart - yStart + clientY
      currentLeft.value = leftStart - xStart + clientX

      emit('on-drag-move', {
        top: currentTop.value,
        left: currentLeft.value
      })
    }

    function handleDragEnd(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)

      emit('on-drag-end', {
        top: currentTop.value,
        left: currentLeft.value
      })
    }

    let resizeState: {
      widthStart: number,
      minHeight: number,
      heightStart: number,
      xStart: number,
      yStart: number
    } | null = null

    function handleResizeStart(event: MouseEvent) {
      if (!props.resizable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      let widthStart
      let heightStart
      let minHeight = 32

      if (currentWidth.value === 'auto') {
        widthStart = wrapper.value?.offsetWidth ?? 0
      } else {
        widthStart = currentWidth.value
      }

      if (currentHeight.value === 'auto') {
        heightStart = wrapper.value?.offsetHeight ?? 0
      } else {
        heightStart = currentHeight.value
      }

      if (header.value) {
        minHeight += header.value.offsetHeight
      }

      if (footer.value) {
        minHeight += footer.value.offsetHeight
      }

      resizeState = {
        widthStart,
        heightStart,
        minHeight: Math.max(minHeight, props.minHeight),
        xStart: event.clientX,
        yStart: event.clientY
      }

      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)

      resizing.value = true
      emit('on-resize-start')
    }

    function handleResizeMove(event: MouseEvent) {
      if (!resizeState) return

      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { widthStart, heightStart, minHeight, xStart, yStart } = resizeState

      currentWidth.value = Math.max(props.minWidth, widthStart - xStart + clientX)
      currentHeight.value = Math.max(minHeight, heightStart - yStart + clientY)

      emit('on-resize-move', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    function handleResizeEnd(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)

      resizing.value = true
      emit('on-resize-end', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    return {
      prefix,
      locale: useLocaleConfig('modal'),
      currentActive,
      resizing,

      className,
      wrapperClass,
      wrapperStyle,
      hasTitle,

      wrapper,
      header,
      footer,

      handleConfirm,
      handleCancle,
      handleClose,
      handleShow,
      handleHide,
      handleMaskClose,
      handleDragStart,
      handleResizeStart
    }
  }
})
</script>
