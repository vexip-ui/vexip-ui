<script setup lang="ts">
import { Wheel } from '@/components/wheel'

import { ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { USE_TOUCH, doubleDigits, range } from '@vexip-ui/utils'

import type { WheelExposed } from '@/components/wheel'
import type { PropType } from 'vue'
import type { DisabledTime, TimeType } from './symbol'

defineOptions({ name: 'TimeWheel' })

const props = defineProps({
  noArrow: {
    type: Boolean,
    default: false
  },
  hour: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 23
  },
  minute: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 59
  },
  second: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 59
  },
  candidate: {
    default: 2 as 0 | 1 | 2 | 3,
    validator: (value: number) => [0, 1, 2, 3].includes(value)
  },
  steps: {
    type: Array as PropType<number[]>,
    default: () => [1, 1, 1],
    validator: (value: [number, number, number]) => {
      if (value[0] && 24 % value[0] !== 0) {
        return false
      }

      for (let i = 1; i < 3; ++i) {
        if (value[i] && 60 % value[i] !== 0) {
          return false
        }
      }

      return true
    }
  },
  pointer: {
    type: Boolean,
    default: USE_TOUCH
  },
  disabledTime: {
    type: Object as PropType<DisabledTime>,
    default: () => ({})
  },
  noTransition: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change', 'toggle-col', 'update:hour', 'update:minute', 'update:second'])

const nh = useNameHelper('time-picker')

const currentHour = ref(props.hour)
const currentMinute = ref(props.minute)
const currentSecond = ref(props.second)
const hourRange = ref<number[]>([])
const minuteRange = ref<number[]>([])
const secondRange = ref<number[]>([])

const hourWheel = ref<WheelExposed>()
const minuteWheel = ref<WheelExposed>()
const secondWheel = ref<WheelExposed>()

watch(() => props.steps, updateTimeRange, { immediate: true })
watch(
  () => props.hour,
  value => {
    currentHour.value = value
  }
)
watch(
  () => props.minute,
  value => {
    currentMinute.value = value
  }
)
watch(
  () => props.second,
  value => {
    currentSecond.value = value
  }
)
watch(currentHour, value => {
  emit('update:hour', value)
  emit('change', 'hour', value)
})
watch(currentMinute, value => {
  emit('update:minute', value)
  emit('change', 'minute', value)
})
watch(currentSecond, value => {
  emit('update:second', value)
  emit('change', 'second', value)
})

defineExpose({ refreshWheel })

function isHourDisabled(hour: number) {
  return typeof props.disabledTime.hour === 'function' && props.disabledTime.hour(hour)
}

function isMinuteDisabled(minute: number) {
  return (
    typeof props.disabledTime.minute === 'function' &&
    props.disabledTime.minute(currentHour.value, minute)
  )
}

function isSecondDisabled(second: number) {
  return (
    typeof props.disabledTime.second === 'function' &&
    props.disabledTime.second(currentHour.value, currentMinute.value, second)
  )
}

function updateTimeRange() {
  const [hourStep = 1, minuteStep = 1, secondStep = 1] = props.steps

  hourRange.value = range(24 / hourStep, 0, hourStep)
  minuteRange.value = range(60 / minuteStep, 0, minuteStep)
  secondRange.value = range(60 / secondStep, 0, secondStep)
}

function handleToggleColumn(type: TimeType) {
  emit('toggle-col', type)
}

function refreshWheel() {
  [hourWheel.value, minuteWheel.value, secondWheel.value].forEach(wheel => {
    wheel?.refreshScroll()
  })
}
</script>

<template>
  <div :class="nh.be('wheel')">
    <Wheel
      ref="hourWheel"
      v-model:value="currentHour"
      inherit
      :pointer="pointer"
      :arrow="!noArrow"
      :candidate="candidate"
      :options="hourRange"
      tabindex="-1"
      :no-transition="noTransition"
      @mouseenter="handleToggleColumn('hour')"
      @touchstart="handleToggleColumn('hour')"
      @keydown.stop
      @item-click="currentHour = $event"
    >
      <template #default="{ option }">
        <span
          :class="[
            nh.be('option'),
            isHourDisabled(option.value as number) && nh.bem('option', 'disabled')
          ]"
        >
          {{ doubleDigits(option.value as number) }}
        </span>
      </template>
    </Wheel>
    <Wheel
      ref="minuteWheel"
      v-model:value="currentMinute"
      inherit
      :pointer="pointer"
      :arrow="!noArrow"
      :candidate="candidate"
      :options="minuteRange"
      tabindex="-1"
      :no-transition="noTransition"
      @mouseenter="handleToggleColumn('minute')"
      @touchstart="handleToggleColumn('minute')"
      @keydown.stop
      @item-click="currentMinute = $event"
    >
      <template #default="{ option }">
        <span
          :class="[
            nh.be('option'),
            isMinuteDisabled(option.value as number) && nh.bem('option', 'disabled')
          ]"
        >
          {{ doubleDigits(option.value as number) }}
        </span>
      </template>
    </Wheel>
    <Wheel
      ref="secondWheel"
      v-model:value="currentSecond"
      inherit
      :pointer="pointer"
      :arrow="!noArrow"
      :candidate="candidate"
      :options="secondRange"
      tabindex="-1"
      :no-transition="noTransition"
      @mouseenter="handleToggleColumn('second')"
      @touchstart="handleToggleColumn('second')"
      @keydown.stop
      @item-click="currentSecond = $event"
    >
      <template #default="{ option }">
        <span
          :class="[
            nh.be('option'),
            isSecondDisabled(option.value as number) && nh.bem('option', 'disabled')
          ]"
        >
          {{ doubleDigits(option.value as number) }}
        </span>
      </template>
    </Wheel>
  </div>
</template>
