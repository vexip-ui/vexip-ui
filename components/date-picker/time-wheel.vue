<template>
  <div :class="nh.be('wheel')">
    <Wheel
      ref="hourWheel"
      v-model:value="currentHour"
      :pointer="pointer"
      :arrow="!noArrow"
      :candidate="candidate"
      :options="hourRange"
      @mouseenter="handleToggleColumn('hour')"
      @touchstart="handleToggleColumn('hour')"
      @keydown.stop
    >
      <template #default="{ option }">
        {{ doubleDigits(option.value) }}
      </template>
    </Wheel>
    <Wheel
      ref="minuteWheel"
      v-model:value="currentMinute"
      :pointer="pointer"
      :arrow="!noArrow"
      :candidate="candidate"
      :options="minuteRange"
      @mouseenter="handleToggleColumn('minute')"
      @touchstart="handleToggleColumn('minute')"
      @keydown.stop
    >
      <template #default="{ option }">
        {{ doubleDigits(option.value) }}
      </template>
    </Wheel>
    <Wheel
      ref="secondWheel"
      v-model:value="currentSecond"
      :pointer="pointer"
      :arrow="!noArrow"
      :candidate="candidate"
      :options="secondRange"
      @mouseenter="handleToggleColumn('second')"
      @touchstart="handleToggleColumn('second')"
      @keydown.stop
    >
      <template #default="{ option }">
        {{ doubleDigits(option.value) }}
      </template>
    </Wheel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Wheel } from '@/components/wheel'
import { useNameHelper } from '@vexip-ui/config'
import { USE_TOUCH, range, doubleDigits } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { TimeType } from './symbol'

export default defineComponent({
  name: 'TimeWheel',
  components: {
    Wheel
  },
  props: {
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
    }
  },
  emits: ['change', 'toggle-col', 'update:hour', 'update:minute', 'update:second'],
  setup(props, { emit }) {
    const currentHour = ref(props.hour)
    const currentMinute = ref(props.minute)
    const currentSecond = ref(props.second)
    const hourRange = ref<number[]>([])
    const minuteRange = ref<number[]>([])
    const secondRange = ref<number[]>([])

    const hourWheel = ref<InstanceType<typeof Wheel> | null>(null)
    const minuteWheel = ref<InstanceType<typeof Wheel> | null>(null)
    const secondWheel = ref<InstanceType<typeof Wheel> | null>(null)

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
      emit('change', 'hour', value)
      emit('update:hour', value)
    })
    watch(currentMinute, value => {
      emit('change', 'minute', value)
      emit('update:minute', value)
    })
    watch(currentSecond, value => {
      emit('change', 'second', value)
      emit('update:second', value)
    })

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

    return {
      nh: useNameHelper('time-picker'),
      currentHour,
      currentMinute,
      currentSecond,
      hourRange,
      minuteRange,
      secondRange,

      hourWheel,
      minuteWheel,
      secondWheel,

      doubleDigits,
      handleToggleColumn,

      refreshWheel
    }
  }
})
</script>
