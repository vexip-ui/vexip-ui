<script setup lang="ts">
import { computed, reactive } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { fenceProps } from './props'

defineOptions({ name: 'Fence' })

const _props = defineProps(fenceProps)
const props = useProps('fence', _props, {
  boxable: false
})

const nh = useNameHelper('fence')

const boxRect = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0
})

const { target: wrapper, moving: boxing } = useMoving({
  capture: false,
  onStart: (state, event) => {
    if (!wrapper.value || !props.boxable || event.button > 0) {
      return false
    }

    boxRect.left = state.clientX - wrapper.value.offsetLeft
    boxRect.top = state.clientY - wrapper.value.offsetTop
    boxRect.width = 0
    boxRect.height = 0

    emitEvent(props.onBoxStart, event)
  },
  onMove: (state, event) => {
    boxRect.width = state.deltaX
    boxRect.height = state.deltaY

    emitEvent(props.onBox, event)
  },
  onEnd: (state, event) => {
    emitEvent(props.onBoxEnd, event)
  }
})

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})
const boxStyle = computed(() => ({
  top: `${boxRect.top}px`,
  left: `${boxRect.left}px`,
  width: `${boxRect.width}px`,
  height: `${boxRect.height}px`
}))
</script>

<template>
  <div ref="wrapper" :class="className">
    <slot></slot>
    <div v-if="boxing" :class="nh.be('box')" :style="boxStyle"></div>
  </div>
</template>
