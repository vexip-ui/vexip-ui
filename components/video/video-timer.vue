<script setup lang="ts">
import { ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'

defineOptions({ name: 'VideoTimer' })

const props = defineProps({
  time: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  }
})

defineEmits(['update:volume'])

const nh = useNameHelper('video')

const currentTime = ref(props.time)
// const editing = ref(false)

watch(
  () => props.time,
  value => {
    currentTime.value = value
  }
)
</script>

<template>
  <div :class="nh.be('timer')">
    <span>
      {{ currentTime }}
    </span>
    <span>/</span>
    <span>
      {{ duration }}
    </span>
  </div>
</template>
