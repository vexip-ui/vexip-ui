<script setup lang="ts">
import { computed } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { fenceItemProps } from './props'

const _props = defineProps(fenceItemProps)
const props = useProps('fence', _props, {
  bool: false
})

const nh = useNameHelper('fence')

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
