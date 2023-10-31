<script setup lang="ts">
import { Icon } from '@/components/icon'

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
const mute = ref(false)

const volumeIcon = computed(() => {
  if (mute.value) return icons.value.volumeMute

  if (currentVolume.value > 50) return icons.value.volumeHigh
  if (currentVolume.value > 0) return icons.value.volumeLow

  return icons.value.volumeOff
})

watch(
  () => props.volume,
  value => {
    currentVolume.value = value
  }
)
</script>

<template>
  <div :class="nh.be('volume')">
    <Icon :icon="volumeIcon"></Icon>
  </div>
</template>
