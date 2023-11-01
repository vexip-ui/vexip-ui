<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Slider } from '@/components/slider'
import { Tooltip } from '@/components/tooltip'

import { computed, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'

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
const visible = ref(true)

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
  <Tooltip
    :class="nh.be('volume')"
    raw
    :tip-class="nh.be('volume-panel')"
    wrapper="div"
    trigger="custom"
    :visible="visible"
  >
    <template #trigger>
      <button :class="nh.be('control')" type="button" @click="toggleMute">
        <Icon :scale="1.4" v-bind="volumeIcon"></Icon>
      </button>
    </template>
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
  </Tooltip>
</template>
