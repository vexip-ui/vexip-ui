<script setup lang="ts">
import { Icon } from '@/components/icon'

import { computed, ref } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import VideoControl from './video-control.vue'
import VideoTimer from './video-timer.vue'
import VideoVolume from './video-volume.vue'
import { videoProps } from './props'

defineOptions({ name: 'Video' })

const _props = defineProps(videoProps)
const props = useProps('video', _props, {
  noControls: false,
  videoAttrs: null
})

const nh = useNameHelper('video')
const locale = useLocale('video')
const icons = useIcons()

const volume = ref(100)

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
      <div :class="nh.be('controls-left')">
        <VideoControl>
          <Icon :scale="1.4" v-bind="icons.play"></Icon>
        </VideoControl>
        <VideoTimer></VideoTimer>
      </div>
      <div :class="nh.be('controls-center')"></div>
      <div :class="nh.be('controls-right')">
        <VideoVolume v-model:volume="volume"></VideoVolume>
        <VideoControl :name="locale.fullScreen">
          <Icon :scale="1.25" v-bind="icons.fullScreen"></Icon>
        </VideoControl>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
