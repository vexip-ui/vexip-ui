<script setup lang="ts">
import { computed, provide, reactive } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { frameAreaProps } from './props'
import { FRAME_AREA_STATE } from './symbol'

defineOptions({ name: 'FrameArea' })

const _props = defineProps(frameAreaProps)
const props = useProps('frameArea', _props, {
  disabled: false
})

const nh = useNameHelper('frame-area')

const fenceState = reactive({
  fencing: false,
  top: 0,
  left: 0,
  width: 0,
  height: 0
})

const { target: wrapper, moving: fencing } = useMoving({
  capture: false,
  onStart: (state, event) => {
    if (!wrapper.value || props.disabled || event.button > 0) {
      return false
    }

    const rect = wrapper.value.getBoundingClientRect()

    fenceState.left = state.clientX - rect.left
    fenceState.top = state.clientY - rect.top
    fenceState.width = 0
    fenceState.height = 0

    fenceState.fencing = true

    emitEvent(props.onFenceStart, event)
  },
  onMove: (state, event) => {
    fenceState.width = state.deltaX
    fenceState.height = state.deltaY

    emitEvent(props.onFence, event)
  },
  onEnd: (_, event) => {
    fenceState.fencing = false

    emitEvent(props.onFenceEnd, event)
  }
})

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})
const fenceStyle = computed(() => ({
  top: `${fenceState.top}px`,
  left: `${fenceState.left}px`,
  width: `${fenceState.width}px`,
  height: `${fenceState.height}px`
}))

provide(FRAME_AREA_STATE, fenceState)
</script>

<template>
  <div ref="wrapper" :class="className">
    <slot></slot>
    <div v-if="fencing" :class="nh.be('fence')" :style="fenceStyle"></div>
  </div>
</template>
