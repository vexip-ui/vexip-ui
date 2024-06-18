<script setup lang="ts">
import { computed } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { frameAreaItemProps } from './props'

defineOptions({ name: 'FrameAreaItem' })

const _props = defineProps(frameAreaItemProps)
const props = useProps('frameArea', _props, {
  bool: false
})

const nh = useNameHelper('frame-area')

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})

function handleClick() {
  emitEvent(props.onClick, props.bool)
}
</script>

<template>
  <div :class="className" @click="handleClick"></div>
</template>
