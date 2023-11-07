<script setup lang="ts">
import { Input } from '@/components/input'

import { computed, nextTick, onMounted, ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { getRangeWidth, isValidNumber, toNumber } from '@vexip-ui/utils'
import { formatTime } from './helper'

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

defineEmits(['update:time'])

const nh = useNameHelper('video')

const currentTime = ref(props.time)
const editing = ref(false)
const width = ref(84)
const inputTime = ref('')

const input = ref<HTMLInputElement>()
const durationEl = ref<HTMLElement>()

const formattedTime = computed(() => formatTime(currentTime.value))

watch(
  () => props.time,
  value => {
    currentTime.value = value
  }
)

onMounted(() => {
  watch(
    () => props.duration,
    () => {
      width.value = durationEl.value ? getRangeWidth(durationEl.value) * 2 + 20 : 84
    },
    { immediate: true }
  )
})

function handleClick() {
  if (!editing.value) {
    editing.value = true
    inputTime.value = formattedTime.value
    nextTick(() => {
      input.value?.focus()
    })
  }
}

function finishInput(confirm: boolean) {
  editing.value = false

  if (confirm) {
    const units = inputTime.value.trim().split(':')

    if (units.every(unit => isValidNumber(unit))) {
      currentTime.value =
        units
          .map(toNumber)
          .reverse()
          .slice(0, 3)
          .reduce((seconds, unit, i) => seconds + 60 ** i * unit, 0) * 1000
      currentTime.value = Math.min(currentTime.value, props.duration)
    }
  }
}
</script>

<template>
  <div
    :class="[nh.be('control'), nh.be('timer')]"
    :style="{ width: `${width}px` }"
    @click="handleClick"
  >
    <Input
      v-if="editing"
      ref="input"
      v-model:value="inputTime"
      :class="nh.be('timer-input')"
      size="small"
      transparent
      @blur="finishInput(false)"
      @enter="finishInput(true)"
    ></Input>
    <template v-else>
      <span>
        {{ formattedTime }}
      </span>
      <span :class="nh.be('timer-separator')">/</span>
      <span ref="durationEl">
        {{ formatTime(duration) }}
      </span>
    </template>
  </div>
</template>
