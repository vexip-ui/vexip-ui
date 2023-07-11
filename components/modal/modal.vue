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
    @resize="handleResize"
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
              type="button"
              :class="nh.be('close')"
              @pointerdown.stop
              @mousedown.stop
              @touchstart.stop
              @click="handleClose(false)"
            >
              <slot name="close">
                <Icon v-bind="icons.close" :scale="1.2" label="close"></Icon>
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
              @click="handleCancel"
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
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'

import { computed, defineComponent, nextTick, reactive, ref, toRef, watch } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { debounce, isNull, isPromise } from '@vexip-ui/utils'
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
    Masker
  },
  props: modalProps,
  emits: ['update:active'],
  setup(_props, { slots, emit }) {
    const nh = useNameHelper('modal')
    const props = useProps('modal', _props, {
      locale: null,
      transfer: false,
      active: {
        default: false,
        static: true
      },
      width: positionProp,
      height: positionProp,
      top: positionProp,
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

    function normalizeStyle(value: string | number) {
      return typeof value === 'number' ? `${value}px` : value
    }

    const currentActive = ref(props.active)
    const rect = reactive({
      top: normalizeStyle(props.top),
      right: normalizeStyle(props.right),
      bottom: normalizeStyle(props.bottom),
      left: normalizeStyle(props.left),
      width: normalizeStyle(props.width),
      height: normalizeStyle(props.height)
    })

    const idIndex = `${idCount++}`

    let transformed = false

    const wrapper = ref<HTMLElement>()
    const footer = ref<HTMLElement>()

    const uselessTop = computed(() => {
      return (
        props.top === 'auto' &&
        !isNull(props.bottom) &&
        props.bottom !== 'auto' &&
        props.height !== 'auto'
      )
    })
    const uselessLeft = computed(() => {
      return (
        props.left === 'auto' &&
        !isNull(props.right) &&
        props.right !== 'auto' &&
        props.width !== 'auto'
      )
    })

    const { target: header, moving: dragging } = useMoving({
      capture: false,
      onStart: (state, event) => {
        if (!wrapper.value || !props.draggable || event.button > 0) {
          return false
        }

        transferRect(false)

        transformed = true
        state.xStart = parseFloat(rect.left)
        state.yStart = parseFloat(rect.top)

        emitEvent(props.onDragStart, {
          top: state.yStart,
          left: state.xStart
        })
      },
      onMove: state => {
        rect.left = `${state.xEnd}px`
        rect.top = `${state.yEnd}px`

        emitEvent(props.onDragMove, {
          top: state.yEnd,
          left: state.xEnd
        })
      },
      onEnd: state => {
        emitEvent(props.onDragEnd, {
          top: state.yEnd,
          left: state.xEnd
        })
      }
    })

    const { target: resizer, moving: resizing } = useMoving({
      onStart: (state, event) => {
        if (!wrapper.value || !props.resizable || event.button > 0) {
          return false
        }

        transferRect()

        let minHeight = 32

        if (header.value) {
          minHeight += header.value.offsetHeight
        }

        if (footer.value) {
          minHeight += footer.value.offsetHeight
        }

        transformed = true
        state.xStart = parseFloat(rect.width)
        state.yStart = parseFloat(rect.height)
        state.minHeight = Math.max(minHeight, props.minHeight)

        emitEvent(props.onResizeStart, {
          width: state.xStart,
          height: state.yStart
        })
      },
      onMove: state => {
        const width = Math.max(props.minWidth, state.xEnd, 32)
        const height = Math.max(state.minHeight as number, state.yEnd)

        rect.width = `${width}px`
        rect.height = `${height}px`

        emitEvent(props.onResizeMove, { width, height })
      },
      onEnd: state => {
        const width = Math.max(props.minWidth, state.xEnd, 32)
        const height = Math.max(state.minHeight as number, state.yEnd)

        emitEvent(props.onResizeEnd, { width, height })
      }
    })

    // const shouldParse = computed(() => !props.draggable && !props.resizable)
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
      return [
        props.modalStyle,
        {
          ...rect,
          height: rect.height !== 'auto' ? rect.height : undefined
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
      props.hideMask && value && handleResize()
    })
    watch([() => props.top, () => props.bottom, () => props.height], () => {
      currentActive.value && computeTop()
    })
    watch([() => props.left, () => props.right, () => props.width], () => {
      currentActive.value && computeLeft()
    })

    const handleResize = debounce(() => {
      if (currentActive.value && !transformed) {
        computeTop()
        computeLeft()
      }
    }, 16)

    function setActive(active: boolean) {
      if (currentActive.value === active) return

      currentActive.value = active

      emit('update:active', active)
      emitEvent(props.onToggle, active)
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
      if (!wrapper.value || props.top !== 'auto' || uselessTop.value) return

      const currentHeight = wrapper.value.offsetHeight

      if (props.inner) {
        rect.top = `${(findPositionalParent().offsetHeight - currentHeight) / 2}px`
      } else {
        rect.top = `${(window.innerHeight - currentHeight) / 2 - 20}px`
      }
    }

    function computeLeft() {
      if (!wrapper.value || props.left !== 'auto' || uselessLeft.value) return

      const currentWidth = wrapper.value.offsetWidth

      if (props.inner) {
        rect.left = `${(findPositionalParent().offsetWidth - currentWidth) / 2}px`
      } else {
        rect.left = `${(window.innerWidth - currentWidth) / 2}px`
      }
    }

    function transferRect(withSize = true) {
      if (!wrapper.value) return

      const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = wrapper.value

      Object.assign(
        rect,
        {
          top: `${offsetTop}px`,
          right: 'auto',
          bottom: 'auto',
          left: `${offsetLeft}px`
        },
        withSize
          ? {
              width: `${offsetWidth}px`,
              height: `${offsetHeight}px`
            }
          : {}
      )
    }

    function handleConfirm() {
      handleClose(true)
      emitEvent(props.onConfirm)
    }

    function handleCancel() {
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
          setActive(false)
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
      locale: useLocale('modal', toRef(props, 'locale')),
      icons: useIcons(),
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

      handleResize,
      handleConfirm,
      handleCancel,
      handleClose,
      handleShow,
      handleHide,
      handleMaskClose
    }
  }
})
</script>
