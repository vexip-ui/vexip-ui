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
    @show="handleShow"
    @hide="handleHide"
  >
    <template #default="{ show }">
      <section v-show="show" :class="wrapperClass" :style="wrapperStyle">
        <div v-if="hasTitle" :class="nh.be('title')">
          <slot name="title">
            {{ props.title }}
          </slot>
          <div v-if="props.closable" :class="nh.be('close')" @click="handleClose()">
            <slot name="close">
              <Icon><Xmark></Xmark></Icon>
            </slot>
          </div>
        </div>
        <div :class="nh.be('content')">
          <slot></slot>
        </div>
        <div
          v-if="props.resizable"
          :class="[
            nh.be('handler'),
            nh.bem('handler', props.placement),
            {
              [nh.bem('handler', 'resizing')]: resizing
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

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { useNameHelper, useProps, booleanProp, booleanStringProp } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { Xmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'
type ClassType = string | Record<string, boolean>

const drawerPlacements = Object.freeze<DrawerPlacement>(['top', 'right', 'bottom', 'left'])

export default defineComponent({
  name: 'Drawer',
  components: {
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
    drawerClass: [String, Object] as PropType<ClassType>,
    hideMask: booleanProp,
    onBeforeClose: Function as PropType<() => any>,
    resizable: booleanProp
  },
  emits: [
    'toggle',
    'close',
    'show',
    'hide',
    'resize-start',
    'resize-move',
    'resize-end',
    'update:active'
  ],
  setup(_props, { slots, emit }) {
    const props = useProps('drawer', _props, {
      transfer: false,
      active: {
        default: false,
        static: true
      },
      width: {
        default: 280,
        validator: (value: number) => value > 0
      },
      height: {
        default: 280,
        validator: (value: number) => value > 0
      },
      placement: {
        default: 'right' as DrawerPlacement,
        validator: (value: DrawerPlacement) => drawerPlacements.includes(value)
      },
      title: '',
      closable: false,
      inner: false,
      maskClose: true,
      drawerClass: null,
      hideMask: false,
      onBeforeClose: {
        default: null,
        isFunc: true
      },
      resizable: false
    })

    const nh = useNameHelper('drawer')
    const currentActive = ref(props.active)
    const currentWidth = ref(props.width)
    const currentHeight = ref(props.height)
    const resizing = ref(false)

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inner')]: props.inner
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
          [nh.bem('wrapper', 'closable')]: props.closable,
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

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(currentActive, value => {
      emit('toggle', value)
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

    async function handleClose() {
      let result: unknown = true

      if (typeof props.onBeforeClose === 'function') {
        result = props.onBeforeClose()

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

    function handleMaskClose() {
      if (props.maskClose) {
        return handleClose()
      }
    }

    function handleShow() {
      emit('show')
    }

    function handleHide() {
      emit('hide')
    }

    let resizeState: {
      widthStart: number,
      heightStart: number,
      xStart: number,
      yStart: number
    } | null = null

    function handleResizeStart(event: MouseEvent) {
      if (!props.resizable || event.button !== 0) {
        return false
      }

      event.stopPropagation()

      resizeState = {
        widthStart: currentWidth.value,
        heightStart: currentHeight.value,
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
      const { widthStart, heightStart, xStart, yStart } = resizeState
      const deltaX = xStart - clientX
      const deltaY = yStart - clientY

      switch (props.placement) {
        case 'top': {
          currentHeight.value = heightStart - deltaY
          break
        }
        case 'right': {
          currentWidth.value = widthStart + deltaX
          break
        }
        case 'bottom': {
          currentHeight.value = heightStart + deltaY
          break
        }
        default: {
          currentWidth.value = widthStart - deltaX
        }
      }

      currentWidth.value = Math.max(currentWidth.value, 101)
      currentHeight.value = Math.max(currentHeight.value, 101)

      emit('resize-move', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    function handleResizeEnd(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)

      resizing.value = false
      emit('resize-end', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    return {
      props,
      nh,
      currentActive,
      resizing,

      className,
      moveTransition,
      wrapperClass,
      wrapperStyle,
      hasTitle,

      handleClose,
      handleMaskClose,
      handleShow,
      handleHide,
      handleResizeStart
    }
  }
})
</script>
