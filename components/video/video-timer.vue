<script setup lang="ts">
import { Input } from '@/components/input'

import { computed, nextTick, onMounted, ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { getRangeWidth, isValidNumber, toNumber } from '@vexip-ui/utils'
import { formatSeconds } from './helper'

defineOptions({ name: 'VideoTimer' })

const props = defineProps({
  time: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change'])

const nh = useNameHelper('video')

const currentTime = ref(props.time)
const editing = ref(false)
const width = ref(84)
const inputTime = ref('')

const input = ref<HTMLInputElement>()
const durationEl = ref<HTMLElement>()

const formattedTime = computed(() => formatSeconds(currentTime.value))

watch(
  () => props.time,
  value => {
    currentTime.value = value
  },
)
watch(
  () => props.disabled,
  value => {
    if (value) {
      editing.value = false
    }
  },
)

onMounted(() => {
  watch(
    () => props.duration,
    () => {
      nextTick(() => {
        width.value = durationEl.value ? getRangeWidth(durationEl.value) * 2 + 20 : 84
      })
    },
    { immediate: true },
  )
})

function handleClick() {
  if (!props.disabled && !editing.value) {
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
      currentTime.value = units
        .map(toNumber)
        .reverse()
        .slice(0, 3)
        .reduce((seconds, unit, i) => seconds + 60 ** i * unit, 0)
      currentTime.value = Math.min(currentTime.value, props.duration)
      emit('change', currentTime.value)
    }
  }
}
</script>

<template>
  <div
    :class="[nh.be('control'), nh.be('timer'), props.disabled && nh.bem('control', 'disabled')]"
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
        {{ formatSeconds(duration) }}
      </span>
    </template>
  </div>
</template>
