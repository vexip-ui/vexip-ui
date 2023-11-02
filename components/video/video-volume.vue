<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Slider } from '@/components/slider'

import { computed, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import VideoControl from './video-control.vue'

defineOptions({ name: 'VideoVolume' })

const props = defineProps({
  volume: {
    type: Number,
    default: 100
  }
})

defineEmits(['update:volume'])

const nh = useNameHelper('video')
const icons = useIcons()
const currentVolume = ref(props.volume)
const muted = ref(false)
// const visible = ref(true)

const volumeIcon = computed(() => (muted.value ? icons.value.volumeMute : icons.value.volume))

watch(
  () => props.volume,
  value => {
    currentVolume.value = value
  }
)

let prevVolume = currentVolume.value

function toggleMute() {
  if (muted.value) {
    currentVolume.value = prevVolume <= 0 ? 50 : prevVolume
  } else {
    prevVolume = currentVolume.value
    currentVolume.value = 0
  }

  muted.value = !muted.value
}

function handleSlide(value: number) {
  prevVolume = value
  currentVolume.value = value
  muted.value = value <= 0
}
</script>

<template>
  <VideoControl
    :class="nh.be('volume')"
    popper-type="panel"
    :popper-class="nh.be('volume-panel')"
    @trigger="toggleMute"
  >
    <Icon :scale="1.4" v-bind="volumeIcon"></Icon>
    <template #panel>
      <div :class="nh.be('volume-text')">
        {{ currentVolume }}
      </div>
      <Slider
        :value="currentVolume"
        :class="nh.be('volume-slider')"
        vertical
        hide-tip
        reverse
        @input="handleSlide"
      ></Slider>
    </template>
  </VideoControl>
</template>
