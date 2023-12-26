<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Slider } from '@/components/slider'

import { computed, inject, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import VideoControl from './video-control.vue'
import { mergeIconScale } from './helper'
import { VIDEO_STATE } from './symbol'

defineOptions({ name: 'VideoVolume' })

const props = defineProps({
  volume: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['change'])

const nh = useNameHelper('video')
const icons = useIcons()

const videoState = inject(VIDEO_STATE)!

const currentVolume = ref(props.volume)
const muted = ref(false)
// const visible = ref(true)

const volumeIcon = computed(() => {
  return muted.value
    ? icons.value.volumeMute
    : currentVolume.value < 0.5
      ? icons.value.volumeLow
      : icons.value.volume
})

watch(
  () => props.volume,
  value => {
    currentVolume.value = value
  }
)

let prevVolume = currentVolume.value

function toggleMute() {
  if (muted.value) {
    currentVolume.value = prevVolume <= 0 ? 0.5 : prevVolume
  } else {
    prevVolume = currentVolume.value
    currentVolume.value = 0
  }

  muted.value = !muted.value

  emit('change', currentVolume.value)
}

function handleSlide(value: number) {
  value /= 100
  prevVolume = value
  currentVolume.value = value
  muted.value = value <= 0

  emit('change', currentVolume.value)
}
</script>

<template>
  <VideoControl
    :class="nh.be('volume')"
    type="panel"
    :tip-class="nh.be('volume-panel')"
    @click="toggleMute"
  >
    <Icon v-bind="mergeIconScale(videoState.iconScale, volumeIcon)"></Icon>
    <template #panel>
      <div :class="nh.be('volume-text')">
        {{ (currentVolume * 100).toFixed() }}
      </div>
      <Slider
        :value="currentVolume * 100"
        :class="nh.be('volume-slider')"
        :min="0"
        :max="100"
        vertical
        hide-tip
        reverse
        :range="false"
        @input="handleSlide"
      ></Slider>
    </template>
  </VideoControl>
</template>
