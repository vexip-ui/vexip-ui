<script setup lang="ts">
import { FullScreen } from '@/components/full-screen'
import { Icon } from '@/components/icon'

import { computed, ref } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import VideoControl from './video-control.vue'
import VideoTimer from './video-timer.vue'
import VideoVolume from './video-volume.vue'
import { useListener } from '@vexip-ui/hooks'
import { isClient } from '@vexip-ui/utils'
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

const pipEnabled = isClient && document.pictureInPictureEnabled

const volume = ref(100)
const pip = ref(false)

const video = ref<HTMLVideoElement>()

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})

useListener(video, 'enterpictureinpicture', () => {
  pip.value = true
})
useListener(video, 'leavepictureinpicture', () => {
  pip.value = false
})

defineExpose({
  video
})

async function togglePip() {
  if (!pipEnabled || !video.value) return

  if (pip.value) {
    await document.exitPictureInPicture()
  } else {
    await video.value.requestPictureInPicture()
  }
}
</script>

<template>
  <FullScreen v-slot="{ toggle }" :class="className">
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
        <VideoControl v-if="pipEnabled" :name="locale.requestPip" @trigger="togglePip">
          <Icon :scale="1.4" v-bind="icons.pip"></Icon>
        </VideoControl>
        <VideoControl :name="locale.fullWindow" @trigger="toggle('window')">
          <Icon :scale="1.4" v-bind="icons.fullWindow"></Icon>
        </VideoControl>
        <VideoControl :name="locale.fullScreen" @trigger="toggle('browser')">
          <Icon :scale="1.25" v-bind="icons.fullScreen"></Icon>
        </VideoControl>
      </div>
    </div>
    <slot></slot>
  </FullScreen>
</template>
