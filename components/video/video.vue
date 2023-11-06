<script setup lang="ts">
import { FullScreen } from '@/components/full-screen'
import { Icon } from '@/components/icon'

import { computed, ref, watch } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import VideoControl from './video-control.vue'
import VideoProgress from './video-progress.vue'
import VideoTimer from './video-timer.vue'
import VideoVolume from './video-volume.vue'
import { useListener } from '@vexip-ui/hooks'
import { isClient } from '@vexip-ui/utils'
import { videoProps } from './props'

import type { FullScreenExposed } from '@/components/full-screen'

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
const time = ref(0)
const duration = ref(1e5)
const playing = ref(false)
const stateShow = ref(true)

const screen = ref<FullScreenExposed>()
const wrapper = computed(() => screen.value?.wrapper)
const video = ref<HTMLVideoElement>()

const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})
const stateIcon = computed(() => (playing.value ? icons.value.pause : icons.value.play))

watch(playing, value => {
  if (value) {
    requestAnimationFrame(() => {
      stateShow.value = false
    })
  } else {
    stateShow.value = true
  }
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

function togglePlaying() {
  playing.value = !playing.value
  wrapper.value?.focus()
}
</script>

<template>
  <FullScreen
    v-slot="{ toggle }"
    ref="screen"
    :class="className"
    tabindex="-1"
  >
    <video
      v-bind="props.videoAttrs"
      ref="video"
      :class="nh.be('player')"
      @click="togglePlaying"
      @canplay="emitEvent(props.onCanplay, $event)"
    ></video>
    <Transition :name="nh.bs('state')">
      <div v-if="stateShow" :class="nh.be('state')">
        <Icon v-bind="stateIcon" :scale="2.5"></Icon>
      </div>
    </Transition>
    <div v-if="!props.noControls" :class="nh.be('controls')">
      <section :class="nh.be('controls-top')">
        <VideoProgress
          v-model:time="time"
          :time-points="[2e4, 3e4, 7e4]"
          :duration="duration"
        ></VideoProgress>
      </section>
      <section :class="nh.be('controls-bottom')">
        <div :class="nh.be('controls-left')">
          <VideoControl :name="playing ? locale.pause : locale.play" @click="togglePlaying">
            <Icon :scale="1.4" v-bind="stateIcon"></Icon>
          </VideoControl>
          <VideoTimer v-model:time="time" :duration="duration"></VideoTimer>
        </div>
        <div :class="nh.be('controls-center')"></div>
        <div :class="nh.be('controls-right')">
          <VideoVolume v-model:volume="volume"></VideoVolume>
          <VideoControl v-if="pipEnabled" :name="locale.requestPip" @click="togglePip">
            <Icon :scale="1.4" v-bind="icons.pip"></Icon>
          </VideoControl>
          <VideoControl :name="locale.fullWindow" @click="toggle('window')">
            <Icon :scale="1.4" v-bind="icons.fullWindow"></Icon>
          </VideoControl>
          <VideoControl :name="locale.fullScreen" shortcut="F" @click="toggle('browser')">
            <Icon :scale="1.25" v-bind="icons.fullScreen"></Icon>
          </VideoControl>
        </div>
      </section>
    </div>
    <slot></slot>
  </FullScreen>
</template>
