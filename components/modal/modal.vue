<template>
  <Masker
    v-model:active="currentActive"
    :class="className"
    :inner="props.inner"
    :transition-name="props.transitionName"
    :closable="props.maskClose"
    :disabled="props.hideMask"
    :on-before-close="handleMaskClose"
    :transfer="props.transfer"
    @show="handleShow"
    @hide="handleHide"
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
          :class="nh.be('header')"
          @mousedown="handleDragStart"
        >
          <div
            v-if="props.closable"
            :class="nh.be('close')"
            @mousedown.stop
            @click="handleClose(false)"
          >
            <slot name="close">
              <Icon><Xmark></Xmark></Icon>
            </slot>
          </div>
          <slot name="header">
            <div :class="nh.be('title')">
              {{ props.title }}
            </div>
          </slot>
        </div>
        <div
          :class="nh.be('content')"
          :style="{
            overflow: resizing ? 'hidden' : undefined
          }"
        >
          <slot></slot>
        </div>
        <div v-if="!props.noFooter" ref="footer" :class="nh.be('footer')">
          <slot name="footer">
            <Button text size="small" @click="handleCancle">
              {{ props.cancelText || locale.cancel }}
            </Button>
            <Button
              type="primary"
              size="small"
              :loading="props.loading"
              @click="handleConfirm"
            >
              {{ props.confirmText || locale.confirm }}
            </Button>
          </slot>
        </div>
        <div v-if="props.resizable" :class="nh.be('resizer')" @mousedown="handleResizeStart"></div>
      </section>
    </template>
  </Masker>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { useNameHelper, useProps, useLocale, booleanProp, booleanStringProp, classProp } from '@vexip-ui/config'
import { isPromise, toNumber } from '@vexip-ui/utils'
import { Xmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'

const positionType = [Number, String]
const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}

export default defineComponent({
  name: 'Modal',
  components: {
    Button,
    Icon,
    Masker,
    Xmark
  },
  props: {
    transfer: booleanStringProp,
    active: booleanProp,
    width: positionType,
    height: positionType,
    top: positionType,
    left: positionType,
    right: positionType,
    bottom: positionType,
    title: String,
    closable: booleanProp,
    inner: booleanProp,
    maskClose: booleanProp,
    modalClass: classProp,
    noFooter: booleanProp,
    hideMask: booleanProp,
    draggable: booleanProp,
    resizable: booleanProp,
    onBeforeClose: Function as PropType<(isConfirm: boolean) => any>,
    loading: booleanProp,
    minWidth: Number,
    minHeight: Number,
    transitionName: String,
    confirmText: String,
    cancelText: String
  },
  emits: [
    'toggle',
    'confirm',
    'cancel',
    'close',
    'show',
    'hide',
    'drag-start',
    'drag-move',
    'drag-end',
    'resize-start',
    'resize-move',
    'resize-end',
    'update:active'
  ],
  setup(_props, { slots, emit }) {
    const props = useProps('modal', _props, {
      transfer: false,
      active: {
        default: false,
        static: true
      },
      width: {
        default: 'auto',
        validator: positionValidator
      },
      height: {
        default: 'auto',
        validator: positionValidator
      },
      top: {
        default: 100,
        validator: positionValidator
      },
      left: {
        default: 'auto',
        validator: positionValidator
      },
      right: {
        default: 'auto',
        validator: positionValidator
      },
      bottom: {
        default: 'auto',
        validator: positionValidator
      },
      title: '',
      closable: true,
      inner: false,
      maskClose: true,
      modalClass: null,
      noFooter: false,
      hideMask: false,
      draggable: false,
      resizable: false,
      onBeforeClose: {
        default: null,
        isFunc: true
      },
      loading: false,
      minWidth: 150,
      minHeight: 120,
      transitionName: 'vxp-ease',
      confirmText: null,
      cancelText: null
    })

    const nh = useNameHelper('modal')
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
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inner')]: props.inner,
          [nh.bm('draggable')]: props.draggable,
          [nh.bm('resizable')]: props.resizable
        }
      ]
    })
    const wrapperClass = computed(() => {
      return [
        nh.be('wrapper'),
        {
          [nh.bem('wrapper', 'closable')]: props.closable
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
      return !!(slots.header || props.title)
    })

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(currentActive, value => {
      emit('toggle', value)
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

      const currentHeight = wrapper.value.offsetHeight

      if (props.top === 'auto' && props.inner) {
        let parentElement = wrapper.value.parentElement as HTMLElement

        while (parentElement && parentElement !== document.body) {
          if (getComputedStyle(parentElement).position !== 'static') {
            currentTop.value = (parentElement.offsetHeight - currentHeight) / 2

            break
          }

          parentElement = parentElement.parentElement as HTMLElement
        }
      } else {
        currentTop.value =
          props.top === 'auto' ? (window.innerHeight - currentHeight) / 2 - 20 : toNumber(props.top)
      }

      hasComputedTop = true
    }

    function computeLeft() {
      if (!wrapper.value || hasComputedLeft) return

      const currentWidth = wrapper.value.offsetWidth

      if (props.left === 'auto' && props.inner) {
        let parentElement = wrapper.value.parentElement as HTMLElement

        while (parentElement && parentElement !== document.body) {
          if (getComputedStyle(parentElement).position !== 'static') {
            currentLeft.value = (parentElement.offsetWidth - currentWidth) / 2

            break
          }

          parentElement = parentElement.parentElement as HTMLElement
        }
      } else {
        currentLeft.value =
          props.left === 'auto' ? (window.innerWidth - currentWidth) / 2 : toNumber(props.left)
      }

      hasComputedLeft = true
    }

    function handleConfirm() {
      handleClose(true)
      emit('confirm')
    }

    function handleCancle() {
      handleClose(false)
      emit('cancel')
    }

    async function handleClose(isConfirm: boolean) {
      let result: unknown = true

      if (typeof props.onBeforeClose === 'function') {
        result = props.onBeforeClose(isConfirm)

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        nextTick(() => {
          currentActive.value = false
          emit('close')
        })
      }

      return result
    }

    function handleShow() {
      emit('show')
    }

    function handleHide() {
      emit('hide')
    }

    function handleMaskClose() {
      if (props.maskClose) {
        return handleClose(false)
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

      emit('drag-start')
    }

    function handleDragMove(event: MouseEvent) {
      if (!dragState) return

      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { topStart, leftStart, xStart, yStart } = dragState

      currentTop.value = topStart - yStart + clientY
      currentLeft.value = leftStart - xStart + clientX

      emit('drag-move', {
        top: currentTop.value,
        left: currentLeft.value
      })
    }

    function handleDragEnd(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)

      emit('drag-end', {
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
      emit('resize-start')
    }

    function handleResizeMove(event: MouseEvent) {
      if (!resizeState) return

      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event
      const { widthStart, heightStart, minHeight, xStart, yStart } = resizeState

      currentWidth.value = Math.max(props.minWidth, widthStart - xStart + clientX)
      currentHeight.value = Math.max(minHeight, heightStart - yStart + clientY)

      emit('resize-move', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    function handleResizeEnd(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)

      resizing.value = true
      emit('resize-end', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    return {
      props,
      nh,
      locale: useLocale('modal'),
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
