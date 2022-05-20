<template>
  <Masker
    v-model:active="currentActive"
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
      <section v-show="show" :class="wrapperClass" :style="wrapperStyle">
        <div v-if="hasTitle" :class="`${prefix}__title`">
          <slot name="title">
            {{ title }}
          </slot>
          <div v-if="closable" :class="`${prefix}__close`" @click="handleClose()">
            <slot name="close">
              <Icon><Times></Times></Icon>
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

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { useConfiguredProps } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { Times } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

type ClassType = string | Record<string, boolean>

const props = useConfiguredProps('drawer', {
  transfer: {
    type: [Boolean, String],
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 280,
    validator: (value: number) => {
      return value > 0
    }
  },
  height: {
    type: Number,
    default: 280,
    validator: (value: number) => {
      return value > 0
    }
  },
  placement: {
    default: 'right' as DrawerPlacement,
    validator: (value: DrawerPlacement) => {
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
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  hideMask: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: Function as PropType<() => unknown>,
    default: null
  },
  resizable: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Drawer',
  components: {
    Icon,
    Masker,
    Times
  },
  // model: {
  //   prop: 'active',
  //   event: 'on-toggle'
  // },
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
  setup(props, { slots, emit }) {
    const prefix = 'vxp-drawer'
    const currentActive = ref(props.active)
    const currentWidth = ref(props.width)
    const currentHeight = ref(props.height)
    const resizing = ref(false)

    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        {
          [`${prefix}--inner`]: props.inner
        }
      ]
    })
    const moveTransition = computed(() => {
      return `vxp-move-${props.placement}`
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}__wrapper`,
        `${prefix}__wrapper--${props.placement}`,
        {
          [`${prefix}__wrapper--closable`]: props.closable,
          [`${prefix}__wrapper--resizing`]: resizing.value
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
      emit('on-toggle', value)
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

      if (typeof props.beforeClose === 'function') {
        result = props.beforeClose()

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

    function handleMaskClose() {
      if (props.maskClose) {
        handleClose()
      }
    }

    function handleShow() {
      emit('on-show')
    }

    function handleHide() {
      emit('on-hide')
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
      emit('on-resize-start')
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

      emit('on-resize-move', {
        width: currentWidth.value,
        height: currentHeight.value
      })
    }

    function handleResizeEnd(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)

      resizing.value = false
      emit('on-resize-end')
    }

    return {
      prefix,
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
