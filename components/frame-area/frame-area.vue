<script setup lang="ts">
import { computed, reactive } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { frameAreaProps } from './props'

defineOptions({ name: 'FrameArea' })

const _props = defineProps(frameAreaProps)
const props = useProps('frameArea', _props, {
  disabled: false
})

const nh = useNameHelper('frame-area')

const fenceRect = reactive({
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

    console.log(state.clientX, rect.left)
    fenceRect.left = state.clientX - rect.left
    fenceRect.top = state.clientY - rect.top
    fenceRect.width = 0
    fenceRect.height = 0

    emitEvent(props.onFenceStart, event)
  },
  onMove: (state, event) => {
    fenceRect.width = state.deltaX
    fenceRect.height = state.deltaY

    emitEvent(props.onFence, event)
  },
  onEnd: (state, event) => {
    emitEvent(props.onFenceEnd, event)
  }
})

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})
const fenceStyle = computed(() => ({
  top: `${fenceRect.top}px`,
  left: `${fenceRect.left}px`,
  width: `${fenceRect.width}px`,
  height: `${fenceRect.height}px`
}))
</script>

<template>
  <div ref="wrapper" :class="className">
    <slot></slot>
    <div v-if="fencing" :class="nh.be('fence')" :style="fenceStyle"></div>
  </div>
</template>
