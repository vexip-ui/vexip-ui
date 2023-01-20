<template>
  <Masker
    v-model:active="currentActive"
    :inherit="props.inherit"
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
        ref="wrapper"
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
import { defineComponent, ref, toRef, computed, watch, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { isPromise, toNumber } from '@vexip-ui/utils'
import { Xmark } from '@vexip-ui/icons'
import { drawerProps } from './props'

const drawerPlacements = Object.freeze(['top', 'right', 'bottom', 'left'])

let idCount = 0

export default defineComponent({
  name: 'Drawer',
  components: {
    Button,
    Icon,
    Masker,
    Xmark
  },
  props: drawerProps,
  emits: ['update:active'],
  setup(_props, { slots, emit }) {
    const props = useProps('drawer', _props, {
      locale: null,
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

    const wrapper = ref<HTMLElement>()

    const idIndex = `${idCount++}`

    const { target: resizer, moving: resizing } = useMoving({
      onStart: (state, event) => {
        if (!props.resizable || event.button > 0 || !wrapper.value) {
          return false
        }

        const width = `${currentWidth.value}`.endsWith('%')
          ? wrapper.value.offsetWidth
          : toNumber(currentWidth.value)
        const height = `${currentHeight.value}`.endsWith('%')
          ? wrapper.value.offsetHeight
          : toNumber(currentHeight.value)

        state.xStart = width
        state.yStart = height

        emitEvent(props.onResizeStart, { width, height })
      },
      onMove: (state, event) => {
        const deltaX = event.clientX - state.clientX
        const deltaY = event.clientY - state.clientY

        let width = toNumber(currentWidth.value)
        let height = toNumber(currentHeight.value)

        switch (props.placement) {
          case 'top': {
            height = state.yStart + deltaY
            break
          }
          case 'right': {
            width = state.xStart - deltaX
            break
          }
          case 'bottom': {
            height = state.yStart - deltaY
            break
          }
          default: {
            width = state.xStart + deltaX
          }
        }

        currentWidth.value = Math.max(width, 100)
        currentHeight.value = Math.max(height, 100)

        emitEvent(props.onResizeMove, {
          width: toNumber(currentWidth.value),
          height: toNumber(currentHeight.value)
        })
      },
      onEnd: () => {
        emitEvent(props.onResizeEnd, {
          width: toNumber(currentWidth.value),
          height: toNumber(currentHeight.value)
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
      return nh.ns(`move-${props.placement}`)
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
          height: `${height}`.endsWith('%') ? height : `${height}px`
        }
      }

      const width = currentWidth.value

      return {
        width: `${width}`.endsWith('%') ? width : `${width}px`
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
      locale: useLocale('drawer', toRef(props, 'locale')),
      currentActive,
      resizing,

      className,
      moveTransition,
      wrapperClass,
      wrapperStyle,
      hasTitle,
      titleId,
      bodyId,

      wrapper,
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
