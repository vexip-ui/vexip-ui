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
import { decimalLength, isClient, toNumber } from '@vexip-ui/utils'
import { videoProps } from './props'
import { videoDefaultControlLayout } from './symbol'

import type { FullScreenExposed } from '@/components/full-screen'
import type { VideoPlayRate } from './symbol'

defineOptions({ name: 'Video' })

const _props = defineProps(videoProps)
const props = useProps('video', _props, {
  src: '',
  noControls: false,
  videoAttrs: null,
  playRates: () => [0.5, 1, 1.25, 1.5, 2],
  kernel: null,
  controlLayout: () => videoDefaultControlLayout,
  refreshable: false,
  poster: '',
  video: null
})

const slots = defineSlots<{
  default: () => any,
  player: () => any,
  poster: () => any,
  extra: () => any
}>()

const nh = useNameHelper('video')
const locale = useLocale('video')
const icons = useIcons()

const pipEnabled = isClient && document.pictureInPictureEnabled

const playing = ref(false)
const currentTime = ref(0)
const duration = ref(1e5)
const volume = ref(100)
const pip = ref(false)
const stateShow = ref(true)
const currentRate = ref(1)
const loadedData = ref(false)

const screen = ref<FullScreenExposed>()
const wrapper = computed(() => screen.value?.wrapper)
const video = ref<HTMLVideoElement>()

const videoRef = computed(() => {
  return typeof slots.player === 'function' ? props.video : video.value
})
const className = computed(() => {
  return [nh.b(), nh.bs('vars')]
})
const playIcon = computed(() => (playing.value ? icons.value.pause : icons.value.play))
const stateIcon = computed(() => {
  return playing.value ? icons.value.pauseState : icons.value.playState
})
const rateOptions = computed(() => {
  const rates = props.playRates
    .map(raw => {
      const rate = typeof raw === 'number' ? { value: raw } : raw

      rate.value = toNumber(rate.value)
      rate.label =
        rate.label || `${decimalLength(rate.value) ? rate.value : rate.value.toFixed(1)}x`

      return rate
    })
    .filter(rate => rate.value > 0)
    .sort((prev, next) => next.value - prev.value)

  if (!rates.find(rate => rate.value === 1)) {
    const index = rates.findIndex(rate => rate.value < 1)

    rates.splice((index + rates.length) % rates.length, 0, { value: 1, label: '1.0x' })
  }

  return rates
})

watch(() => props.src, resetMetaState, { flush: 'pre' })
watch(playing, value => {
  if (value) {
    requestAnimationFrame(() => {
      stateShow.value = false
    })
  } else {
    stateShow.value = true
  }
})

useListener(videoRef, 'canplay', () => {
  duration.value = videoRef.value?.duration ?? 0
})
useListener(videoRef, 'timeupdate', () => {
  currentTime.value = videoRef.value?.currentTime ?? 0
})
useListener(videoRef, 'ended', handleEnded)
useListener(videoRef, 'loadeddata', () => {
  loadedData.value = true
})
useListener(videoRef, 'enterpictureinpicture', () => {
  pip.value = true
})
useListener(videoRef, 'leavepictureinpicture', () => {
  pip.value = false
})

defineExpose({
  playing,
  currentTime,
  duration,
  pip,
  wrapper,
  video
})

function togglePlaying() {
  playing.value = !playing.value

  playing.value ? videoRef.value?.play() : videoRef.value?.pause()
  wrapper.value?.focus()
  emitEvent(playing.value ? props.onPlay : props.onPause)
}

function handleEnded() {
  playing.value = false

  videoRef.value?.pause()
  emitEvent(props.onEnded)
}

async function togglePip() {
  if (!pipEnabled || !videoRef.value) return

  if (pip.value) {
    await document.exitPictureInPicture()
  } else {
    await videoRef.value.requestPictureInPicture()
  }
}

function changeRate(rate: VideoPlayRate) {
  currentRate.value = rate.value

  if (videoRef.value) {
    videoRef.value.playbackRate = rate.value
  }
}

function changeTime(time: number) {
  currentTime.value = time

  if (videoRef.value) {
    videoRef.value.currentTime = time
  }
}

function changeVolume(newVolume: number) {
  volume.value = newVolume

  if (videoRef.value) {
    videoRef.value.volume = newVolume / 100
  }
}

function resetMetaState() {
  playing.value = false
  currentTime.value = 0
  duration.value = 0
  loadedData.value = false
  pip.value = false

  videoRef.value?.pause()
}
</script>

<template>
  <FullScreen
    v-slot="{ toggle }"
    ref="screen"
    :class="className"
    tabindex="-1"
  >
    <div :class="nh.be('player')" @click="togglePlaying">
      <slot name="player">
        <video
          v-bind="props.videoAttrs"
          ref="video"
          :class="nh.be('video')"
          :src="props.src || props.videoAttrs?.src"
        >
          <slot></slot>
        </video>
      </slot>
    </div>
    <div v-if="!loadedData && (props.poster || $slots.poster)" :class="nh.be('poster')">
      <slot name="poster">
        <img :src="props.poster" />
      </slot>
    </div>
    <Transition :name="nh.bs('state-effect')">
      <div v-if="stateShow" :class="nh.be('state')">
        <Icon v-bind="stateIcon" :scale="4"></Icon>
      </div>
    </Transition>
    <div v-if="!props.noControls" :class="nh.be('controls')">
      <section :class="nh.be('controls-top')">
        <VideoProgress
          :time="currentTime"
          :duration="duration"
          @change="changeTime"
        ></VideoProgress>
      </section>
      <section :class="nh.be('controls-bottom')">
        <div :class="nh.be('controls-left')">
          <VideoControl :name="locale.playPrev" @click="togglePlaying">
            <Icon v-bind="icons.playPrev" :scale="1.3"></Icon>
          </VideoControl>
          <VideoControl :name="playing ? locale.pause : locale.play" @click="togglePlaying">
            <Icon v-bind="playIcon" :scale="1.5"></Icon>
          </VideoControl>
          <VideoControl :name="locale.playPrev" @click="togglePlaying">
            <Icon v-bind="icons.playNext" :scale="1.3"></Icon>
          </VideoControl>
          <VideoControl v-if="props.refreshable" :name="locale.refresh" @click="togglePlaying">
            <Icon v-bind="icons.refresh" :scale="1.15"></Icon>
          </VideoControl>
          <VideoTimer :time="currentTime" :duration="duration" @change="changeTime"></VideoTimer>
        </div>
        <div :class="nh.be('controls-center')"></div>
        <div :class="nh.be('controls-right')">
          <VideoControl
            :class="nh.be('play-rate')"
            type="select"
            :value="currentRate"
            :options="rateOptions"
            @select="changeRate"
          ></VideoControl>
          <VideoVolume :volume="volume" @change="changeVolume"></VideoVolume>
          <VideoControl v-if="pipEnabled && video" :name="locale.requestPip" @click="togglePip">
            <Icon v-bind="icons.pip" :scale="1.3"></Icon>
          </VideoControl>
          <VideoControl :name="locale.fullWindow" @click="toggle('window')">
            <Icon v-bind="icons.fullWindow" :scale="1.3"></Icon>
          </VideoControl>
          <VideoControl :name="locale.fullScreen" shortcut="F" @click="toggle('browser')">
            <Icon v-bind="icons.fullScreen" :scale="1.15"></Icon>
          </VideoControl>
        </div>
      </section>
    </div>
    <slot name="extra"></slot>
  </FullScreen>
</template>
