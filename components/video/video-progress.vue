<script setup lang="ts">
import { Slider } from '@/components/slider'

import { computed, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { SliderExposed } from '@/components/slider'

interface PointState {
  start: number,
  startPercent: number,
  end: number,
  endPercent: number,
  duration: number,
  durationPercent: number,
  width: number
}

defineOptions({ name: 'VideoProgress' })

const props = defineProps({
  time: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  timePoints: {
    type: Array as PropType<number[]>,
    default: () => []
  }
})

// const emit = defineEmits(['update:time'])

const nh = useNameHelper('video')

const slider = ref<SliderExposed>()

const sliding = computed(() => !!slider.value?.sliding)
const percent = computed(() => {
  return props.duration ? (props.time / props.duration) * 100 : 0
})
const className = computed(() => {
  return {
    [nh.be('progress')]: true,
    [nh.bem('progress', 'sliding')]: sliding.value
  }
})
const points = computed<PointState[]>(() => {
  const duration = Math.max(1, props.duration)

  let times = props.timePoints.filter(time => time >= 0 && time <= duration)

  if (!times.length) times = [0, duration]

  times = times.at(-1) === duration ? props.timePoints : [...times, duration]
  times = times[0] === 0 ? times : [0, ...times]

  const points: PointState[] = []

  for (let i = 0, len = times.length - 1; i < len; ++i) {
    const start = times[i]
    const end = times[i + 1]
    const pointDuration = end - start

    points.push({
      start,
      startPercent: (start / duration) * 100,
      end,
      endPercent: (end / duration) * 100,
      duration: pointDuration,
      durationPercent: (pointDuration / duration) * 100,
      width: ((end - start) / duration) * 100
    })
  }

  return points
})
</script>

<template>
  <div :class="className">
    <Slider
      ref="slider"
      :class="nh.be('progress-slider')"
      :value="percent * 10"
      :max="1000"
      :vertical="false"
      hide-tip
      trigger-fade
      flip-marker
    >
      <template #filler="state">
        <div
          v-for="(point, index) in points"
          :key="index"
          :class="nh.be('progress-segment')"
          :style="{ width: `${point.width}%` }"
        >
          <div
            :class="nh.be('progress-filler')"
            :style="{
              transform: `translateX(${Math.min(
                (Math.max(state.percent[1] - point.startPercent, 0) / point.durationPercent) * 100 -
                  100,
                0
              )}%) translateZ(0)`
            }"
          ></div>
        </div>
      </template>
    </Slider>
  </div>
</template>
