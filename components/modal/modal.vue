<template>
  <Masker
    v-model:active="currentActive"
    :inherit="props.inherit"
    :class="className"
    :inner="props.inner"
    :transition-name="props.transitionName"
    :closable="props.maskClose"
    :disabled="props.hideMask"
    :on-before-close="handleMaskClose"
    :transfer="props.transfer"
    :auto-remove="props.autoRemove"
    @show="handleShow"
    @hide="handleHide"
  >
    <template #default="{ show }">
      <section
        v-show="show"
        ref="wrapper"
        :class="wrapperClass"
        role="dialog"
        :style="wrapperStyle"
        :aria-modal="show ? 'true' : undefined"
        :aria-labelledby="titleId"
        :aria-describedby="bodyId"
      >
        <div v-if="hasTitle" ref="header" :class="nh.be('header')">
          <slot name="header">
            <div :id="titleId" :class="nh.be('title')">
              <slot name="title">
                {{ props.title }}
              </slot>
            </div>
            <button
              v-if="props.closable"
              :class="nh.be('close')"
              @pointerdown.stop
              @mousedown.stop
              @touchstart.stop
              @click="handleClose(false)"
            >
              <slot name="close">
                <Icon :scale="1.2" label="close">
                  <Xmark></Xmark>
                </Icon>
              </slot>
            </button>
          </slot>
        </div>
        <div
          :id="bodyId"
          :class="nh.be('content')"
          :style="{
            overflow: resizing ? 'hidden' : undefined
          }"
        >
          <slot></slot>
        </div>
        <div v-if="!props.noFooter" ref="footer" :class="nh.be('footer')">
          <slot name="footer">
            <Button
              inherit
              text
              size="small"
              @click="handleCancle"
            >
              {{ props.cancelText || locale.cancel }}
            </Button>
            <Button
              inherit
              type="primary"
              size="small"
              :loading="props.loading"
              @click="handleConfirm"
            >
              {{ props.confirmText || locale.confirm }}
            </Button>
          </slot>
        </div>
        <div v-if="props.resizable" ref="resizer" :class="nh.be('resizer')"></div>
      </section>
    </template>
  </Masker>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { isPromise, toNumber } from '@vexip-ui/utils'
import { Xmark } from '@vexip-ui/icons'
import { modalProps } from './props'

const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}
const positionProp = {
  default: 'auto' as const,
  validator: positionValidator
}

let idCount = 0

export default defineComponent({
  name: 'Modal',
  components: {
    Button,
    Icon,
    Masker,
    Xmark
  },
  props: modalProps,
  emits: ['update:active'],
  setup(_props, { slots, emit }) {
    const nh = useNameHelper('modal')
    const props = useProps('modal', _props, {
      transfer: false,
      active: {
        default: false,
        static: true
      },
      width: positionProp,
      height: positionProp,
      top: {
        default: 100,
        validator: positionValidator
      },
      left: positionProp,
      right: positionProp,
      bottom: positionProp,
      title: '',
      closable: true,
      inner: false,
      maskClose: true,
      modalClass: null,
      modalStyle: null,
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
      transitionName: () => nh.ns('ease'),
      confirmText: null,
      cancelText: null,
      autoRemove: false
    })

    const currentActive = ref(props.active)
    const currentTop = ref(toNumber(props.top))
    const currentLeft = ref(toNumber(props.left))
    const currentWidth = ref<'auto' | number>(normalizeSizeValue(props.width))
    const currentHeight = ref<'auto' | number>(normalizeSizeValue(props.height))

    const idIndex = `${idCount++}`

    let hasComputedTop = false
    let hasComputedLeft = false

    const wrapper = ref<HTMLElement>()
    const footer = ref<HTMLElement>()

    const { target: header, moving: dragging } = useMoving({
      capture: false,
      onStart: (state, event) => {
        if (!props.draggable || event.button > 0) {
          return false
        }

        state.xStart = currentLeft.value
        state.yStart = currentTop.value

        emitEvent(props.onDragStart, {
          top: currentTop.value,
          left: currentLeft.value
        })
      },
      onMove: state => {
        currentLeft.value = state.xEnd
        currentTop.value = state.yEnd

        emitEvent(props.onDragMove, {
          top: currentTop.value,
          left: currentLeft.value
        })
      },
      onEnd: () => {
        emitEvent(props.onDragEnd, {
          top: currentTop.value,
          left: currentLeft.value
        })
      }
    })

    const { target: resizer, moving: resizing } = useMoving({
      onStart: (state, event) => {
        if (!props.resizable || event.button > 0) {
          return false
        }

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

        state.xStart = widthStart
        state.yStart = heightStart
        state.minHeight = Math.max(minHeight, props.minHeight)

        emitEvent(props.onResizeStart, {
          width: widthStart,
          height: heightStart
        })
      },
      onMove: state => {
        currentWidth.value = state.xEnd
        currentHeight.value = state.yEnd

        currentWidth.value = Math.max(props.minWidth, state.xEnd)
        currentHeight.value = Math.max(state.minHeight as number, state.yEnd)

        emitEvent(props.onResizeMove, {
          width: currentWidth.value as number,
          height: currentHeight.value as number
        })
      },
      onEnd: () => {
        emitEvent(props.onResizeEnd, {
          width: currentWidth.value as number,
          height: currentHeight.value as number
        })
      }
    })

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
          [nh.bem('wrapper', 'closable')]: props.closable,
          [nh.bem('wrapper', 'dragging')]: dragging.value,
          [nh.bem('wrapper', 'resizing')]: resizing.value
        },
        props.modalClass
      ]
    })
    const wrapperStyle = computed(() => {
      const fixedHeight = currentHeight.value !== 'auto'

      return [
        props.modalStyle,
        {
          top: `${currentTop.value}px`,
          right:
            fixedHeight || !props.right || props.right === 'auto' ? undefined : `${props.right}px`,
          bottom:
            fixedHeight || !props.bottom || props.bottom === 'auto'
              ? undefined
              : `${props.bottom}px`,
          left: `${currentLeft.value}px`,
          width: `${currentWidth.value}px`,
          height: fixedHeight ? `${currentHeight.value}px` : undefined
        }
      ]
    })
    const hasTitle = computed(() => {
      return !!(slots.header || props.title)
    })
    const titleId = computed(() => `${nh.bs(idIndex)}__title`)
    const bodyId = computed(() => `${nh.bs(idIndex)}__body`)

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(currentActive, value => {
      emitEvent(props.onToggle, value)
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
        currentWidth.value = normalizeSizeValue(value)
        computeLeft()
      }
    )
    watch(
      () => props.height,
      value => {
        currentHeight.value = normalizeSizeValue(value)
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

    function normalizeSizeValue(value: string | number) {
      return value === 'auto' ? 'auto' : toNumber(value)
    }

    function findPositionalParent() {
      if (!wrapper.value) return document.body

      let parentElement = wrapper.value.parentElement as HTMLElement

      while (parentElement && parentElement !== document.body) {
        if (getComputedStyle(parentElement).position !== 'static') {
          return parentElement
        }

        parentElement = parentElement.parentElement as HTMLElement
      }

      return parentElement
    }

    function computeTop() {
      if (!wrapper.value || hasComputedTop) return

      const currentHeight = wrapper.value.offsetHeight

      if (props.top === 'auto' && props.inner) {
        currentTop.value = (findPositionalParent().offsetHeight - currentHeight) / 2
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
        currentLeft.value = (findPositionalParent().offsetWidth - currentWidth) / 2
      } else {
        currentLeft.value =
          props.left === 'auto' ? (window.innerWidth - currentWidth) / 2 : toNumber(props.left)
      }

      hasComputedLeft = true
    }

    function handleConfirm() {
      handleClose(true)
      emitEvent(props.onConfirm)
    }

    function handleCancle() {
      handleClose(false)
      emitEvent(props.onCancel)
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
          emitEvent(props.onClose)
        })
      }

      return result
    }

    function handleShow() {
      emitEvent(props.onShow)
    }

    function handleHide() {
      emitEvent(props.onHide)
    }

    function handleMaskClose() {
      if (props.maskClose) {
        return handleClose(false)
      }
    }

    return {
      props,
      nh,
      locale: useLocale('modal'),
      currentActive,
      dragging,
      resizing,
      titleId,
      bodyId,

      className,
      wrapperClass,
      wrapperStyle,
      hasTitle,

      wrapper,
      header,
      footer,
      resizer,

      handleConfirm,
      handleCancle,
      handleClose,
      handleShow,
      handleHide,
      handleMaskClose
    }
  }
})
</script>
