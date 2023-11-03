<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
// import { useSetTimeout } from '@vexip-ui/hooks'

defineOptions({ name: 'VideoProgress' })

const props = defineProps({
  percent: {
    type: Number,
    default: 0
  }
})

// const emit = defineEmits(['update:percent'])

const nh = useNameHelper('video')

// const { timer } = useSetTimeout()

const currentPercent = ref(props.percent)
const sliding = ref(false)

const className = computed(() => {
  return {
    [nh.be('progress')]: true,
    [nh.bem('progress', 'sliding')]: sliding.value
  }
})

watch(
  () => props.percent,
  value => {
    currentPercent.value = value
  }
)
</script>

<template>
  <div :class="className"></div>
</template>
