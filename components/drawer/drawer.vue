<template>
  <Masker
    v-model:active="currentActive"
    :class="className"
    :inner="props.inner"
    :transition-name="moveTransition"
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
        :class="wrapperClass"
        :style="wrapperStyle"
        role="dialog"
        :aria-modal="show ? 'true' : undefined"
        :aria-labelledby="titleId"
        :aria-describedby="bodyId"
      >
        <div v-if="hasTitle" :class="nh.be('header')">
          <div :id="titleId" :class="nh.be('title')">
            <slot name="title">
              {{ props.title }}
            </slot>
          </div>
          <button v-if="props.closable" :class="nh.be('close')" @click="handleClose()">
            <slot name="close">
              <Icon :scale="1.2" label="close">
                <Xmark></Xmark>
              </Icon>
            </slot>
          </button>
        </div>
        <div :id="bodyId" :class="nh.be('content')">
          <slot></slot>
        </div>
        <div v-if="props.footer || $slots.footer" :class="nh.be('footer')">
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
        <div
          v-if="props.resizable"
          ref="resizer"
          :class="[
            nh.be('handler'),
            nh.bem('handler', props.placement),
            {
              [nh.bem('handler', 'resizing')]: resizing
            }
          ]"
        >
          <slot name="handler" :resizing="resizing"></slot>
        </div>
      </section>
    </template>
  </Masker>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  booleanStringProp,
  classProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { isPromise } from '@vexip-ui/utils'
import { Xmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

const drawerPlacements = Object.freeze<DrawerPlacement>(['top', 'right', 'bottom', 'left'])

let idCount = 0

export default defineComponent({
  name: 'Drawer',
  components: {
    Button,
    Icon,
    Masker,
    Xmark
  },
  props: {
    transfer: booleanStringProp,
    active: booleanProp,
    width: Number,
    height: Number,
    placement: String as PropType<DrawerPlacement>,
    title: String,
    closable: booleanProp,
    inner: booleanProp,
    maskClose: booleanProp,
    drawerClass: classProp,
    hideMask: booleanProp,
    onBeforeClose: Function as PropType<(isConfirm?: boolean) => any>,
    resizable: booleanProp,
    autoRemove: booleanProp,
    footer: booleanProp,
    confirmText: String,
    cancelText: String,
    loading: booleanProp,
    onToggle: eventProp<(active: boolean) => void>(),
    onClose: eventProp(),
    onShow: eventProp(),
    onHide: eventProp(),
    onResizeStart: eventProp<(rect: { width: number, height: number }) => void>(),
    onResizeMove: eventProp<(rect: { width: number, height: number }) => void>(),
    onResizeEnd: eventProp<(rect: { width: number, height: number }) => void>(),
    onConfirm: eventProp(),
    onCancel: eventProp()
  },
  emits: ['update:active'],
  setup(_props, { slots, emit }) {
    const props = useProps('drawer', _props, {
      transfer: false,
      active: {
        default: false,
        static: true
      },
      width: {
        default: 280,
        validator: value => value > 0
      },
      height: {
        default: 280,
        validator: value => value > 0
      },
      placement: {
        default: 'right',
        validator: value => drawerPlacements.includes(value)
      },
      title: '',
      closable: true,
      inner: false,
      maskClose: true,
      drawerClass: null,
      hideMask: false,
      onBeforeClose: {
        default: null,
        isFunc: true
      },
      resizable: false,
      autoRemove: false,
      footer: false,
      confirmText: null,
      cancelText: null,
      loading: false
    })

    const nh = useNameHelper('drawer')
    const currentActive = ref(props.active)
    const currentWidth = ref(props.width)
    const currentHeight = ref(props.height)

    const idIndex = `${idCount++}`

    const { target: resizer, moving: resizing } = useMoving({
      onStart: (state, event) => {
        if (!props.resizable || event.button > 0) {
          return false
        }

        state.xStart = currentWidth.value
        state.yStart = currentHeight.value

        emitEvent(props.onResizeStart, {
          width: currentWidth.value,
          height: currentHeight.value
        })
      },
      onMove: (state, event) => {
        const deltaX = event.clientX - state.clientX
        const deltaY = event.clientY - state.clientY

        switch (props.placement) {
          case 'top': {
            currentHeight.value = state.yStart + deltaY
            break
          }
          case 'right': {
            currentWidth.value = state.xStart - deltaX
            break
          }
          case 'bottom': {
            currentHeight.value = state.yStart - deltaY
            break
          }
          default: {
            currentWidth.value = state.xStart + deltaX
          }
        }

        currentWidth.value = Math.max(currentWidth.value, 101)
        currentHeight.value = Math.max(currentHeight.value, 101)

        emitEvent(props.onResizeMove, {
          width: currentWidth.value,
          height: currentHeight.value
        })
      },
      onEnd: () => {
        emitEvent(props.onResizeEnd, {
          width: currentWidth.value,
          height: currentHeight.value
        })
      }
    })

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inner')]: props.inner,
          [nh.bm('closable')]: props.closable,
          [nh.bm('resizable')]: props.resizable
        }
      ]
    })
    const moveTransition = computed(() => {
      return `vxp-move-${props.placement}`
    })
    const wrapperClass = computed(() => {
      return [
        nh.be('wrapper'),
        nh.bem('wrapper', props.placement),
        {
          [nh.bem('wrapper', 'resizing')]: resizing.value
        },
        props.drawerClass
      ]
    })
    const wrapperStyle = computed(() => {
      const placement = props.placement

      if (placement === 'top' || placement === 'bottom') {
        const height = currentHeight.value

        return {
          height: height > 100 ? `${height}px` : `${height}%`
        }
      }

      const width = currentWidth.value

      return {
        width: width > 100 ? `${width}px` : `${width}%`
      }
    })
    const hasTitle = computed(() => {
      return !!(slots.title ?? props.title)
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
    })
    watch(
      () => props.width,
      value => {
        currentWidth.value = value
      }
    )
    watch(
      () => props.height,
      value => {
        currentHeight.value = value
      }
    )

    async function handleClose(isConfirm = false) {
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

    function handleMaskClose() {
      if (props.maskClose) {
        return handleClose()
      }
    }

    function handleShow() {
      emitEvent(props.onShow)
    }

    function handleHide() {
      emitEvent(props.onHide)
    }

    function handleConfirm() {
      handleClose(true)
      emitEvent(props.onConfirm)
    }

    function handleCancle() {
      handleClose(false)
      emitEvent(props.onCancel)
    }

    return {
      props,
      nh,
      locale: useLocale('modal'),
      currentActive,
      resizing,

      className,
      moveTransition,
      wrapperClass,
      wrapperStyle,
      hasTitle,
      titleId,
      bodyId,

      resizer,

      handleClose,
      handleMaskClose,
      handleShow,
      handleHide,
      handleConfirm,
      handleCancle
    }
  }
})
</script>
