<script setup lang="ts">
import { computed, ref } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { videoProps } from './props'

defineOptions({ name: 'Video' })

const _props = defineProps(videoProps)
const props = useProps('video', _props, {
  noControls: false,
  videoAttrs: null
})

const nh = useNameHelper('video')

const video = ref<HTMLVideoElement>()

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})

defineExpose({
  video
})
</script>

<template>
  <div :class="className">
    <video
      v-bind="props.videoAttrs"
      ref="video"
      :class="nh.be('player')"
      @canplay="emitEvent(props.onCanplay, $event)"
    ></video>
    <div v-if="!props.noControls" :class="nh.be('controls')">
      <div :class="nh.be('control-left')"></div>
      <div :class="nh.be('control-center')"></div>
      <div :class="nh.be('control-right')"></div>
    </div>
    <slot></slot>
  </div>
</template>
