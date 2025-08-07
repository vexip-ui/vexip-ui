<script setup lang="ts">
import { ResizeObserver } from '@/components/resize-observer'
import { Slider } from '@/components/slider'

import { computed, ref } from 'vue'

import { getStepByWord, useLocale, useNameHelper } from '@vexip-ui/config'
import { useListener, useSetTimeout } from '@vexip-ui/hooks'
import { boundRange, throttle } from '@vexip-ui/utils'
import { formatSeconds } from './helper'

import type { PropType } from 'vue'
import type { SliderExposed } from '@/components/slider'
import type { VideoSegment } from './symbol'

interface PointState {
  start: number,
  startPercent: number,
  end: number,
  endPercent: number,
  duration: number,
  durationPercent: number,
  width: number,
}

defineOptions({ name: 'VideoProgress' })

const props = defineProps({
  time: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  segments: {
    type: Array as PropType<VideoSegment[]>,
    default: () => [],
  },
  noPreview: {
    type: Boolean,
    default: false,
  },
  previewSrc: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['change'])

const nh = useNameHelper('video')
const locale = useLocale('video')

const { timer } = useSetTimeout()

const slidTime = ref(0)
const hovered = ref(false)
const hoveredTime = ref(0)
const indicatorLeft = ref(0)
const previewLeft = ref(0)

let paddingX = [0, 0]
let sliderWidth = 100
let previewWidth = 60

const wrapper = ref<HTMLElement>()
const slider = ref<SliderExposed>()
const sliderEl = computed(() => slider.value?.$el as HTMLElement | undefined)
const preview = ref<HTMLElement>()

const sliding = computed(() => !!slider.value?.sliding[1])
const percent = computed(() => {
  return props.duration ? ((sliding.value ? slidTime.value : props.time) / props.duration) * 100 : 0
})
const className = computed(() => {
  return {
    [nh.be('progress')]: true,
    [nh.bem('progress', 'sliding')]: sliding.value,
    [nh.bem('progress', 'disabled')]: props.duration <= 0,
  }
})
const points = computed<PointState[]>(() => {
  const duration = Math.max(1, props.duration)

  let times = props.segments.map(segment => segment.time)

  if (!times.length) times = [0, duration]

  times = times.at(-1) === duration ? times : [...times, duration]
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
      width: ((end - start) / duration) * 100,
    })
  }

  return points
})
const segmentLabel = computed(() => {
  const time = hoveredTime.value
  const segments = props.segments

  if (!segments.length) return ''

  let index = -1

  if (time <= 0) {
    index = 0
  } else {
    for (let i = 1, len = segments.length; i < len; ++i) {
      if (segments[i].time > time) {
        index = i - 1
        break
      }
    }
  }

  if (index < 0) {
    index = segments.length - 1
  }

  const title = segments[index]?.title || getStepByWord(locale.value.chapterCount, index + 1)

  return title && ` (${title})`
})

useListener(sliderEl, 'pointerenter', () => {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    hovered.value = true
  }, 100)
})
useListener(sliderEl, 'pointerleave', () => {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    hovered.value = false
  }, 100)
})
useListener(
  sliderEl,
  'pointermove',
  throttle((event: PointerEvent) => {
    if (!sliding.value) {
      processMoveOnTrack(event)
    }
  }),
)

function processMoveOnTrack(event: PointerEvent) {
  if (!sliderEl.value) return

  const offsetX = boundRange(
    event.clientX - sliderEl.value.getBoundingClientRect().left,
    0,
    sliderWidth,
  )

  hoveredTime.value = (offsetX / sliderWidth) * props.duration
  indicatorLeft.value = offsetX + paddingX[0]
  previewLeft.value = boundRange(
    offsetX - previewWidth * 0.5 + paddingX[0],
    0,
    sliderWidth - previewWidth + paddingX[0] + paddingX[1],
  )
}

function onSliderResize(entry: ResizeObserverEntry) {
  if (!wrapper.value) return

  const style = getComputedStyle(wrapper.value)

  paddingX = [parseFloat(style.paddingLeft), parseFloat(style.paddingRight)]
  sliderWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width
}

function onPreviewResize(entry: ResizeObserverEntry) {
  previewWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width
}

function handleChange(permillage: number) {
  emit('change', (permillage / 1000) * props.duration)
}

const onSlideMove = throttle(processMoveOnTrack)

function onSlideStart() {
  slidTime.value = props.time

  document.addEventListener('pointermove', onSlideMove)
  document.addEventListener('pointerup', onSlideEnd)
}

function onSlideEnd() {
  document.removeEventListener('pointermove', onSlideMove)
  document.removeEventListener('pointerup', onSlideEnd)
}
</script>

<template>
  <div ref="wrapper" :class="className">
    <ResizeObserver :on-resize="onSliderResize">
      <Slider
        ref="slider"
        :class="nh.be('progress-slider')"
        :value="percent * 10"
        :max="1000"
        :vertical="false"
        :range="false"
        hide-tip
        trigger-fade
        flip-marker
        :disabled="duration <= 0"
        @change="handleChange"
        @pointerdown="onSlideStart"
      >
        <template #filler="state">
          <div
            v-for="(point, index) in points"
            :key="index"
            :class="nh.be('progress-segment')"
            :style="{ width: `${point.width}%` }"
          >
            <div :class="nh.be('progress-track')">
              <div
                :class="nh.be('progress-filler')"
                :style="{
                  visibility: state.percent[1] < point.startPercent ? 'hidden' : undefined,
                  transform: `translateX(${Math.min(
                    (Math.max(state.percent[1] - point.startPercent, 0) / point.durationPercent) *
                      100 -
                      100,
                    0,
                  )}%) translateZ(0)`,
                }"
              ></div>
            </div>
          </div>
        </template>
        <template #trigger>
          <slot name="trigger">
            <div :class="nh.be('progress-trigger')"></div>
          </slot>
        </template>
      </Slider>
    </ResizeObserver>
    <div
      :class="{
        [nh.be('progress-indicator')]: true,
        [nh.bem('progress-indicator', 'active')]: hovered && !sliding,
      }"
      :style="{ transform: `translateX(${indicatorLeft}px) translateZ(0)` }"
    ></div>
    <ResizeObserver v-if="!noPreview" :on-resize="onPreviewResize">
      <div
        ref="preview"
        :class="{
          [nh.be('preview')]: true,
          [nh.bem('preview', 'has-image')]: previewSrc,
          [nh.bem('preview', 'active')]: hovered || sliding,
        }"
        :style="{ transform: `translateX(${previewLeft}px) translateZ(0)` }"
      >
        <slot name="preview">
          <div v-if="previewSrc" :class="nh.be('preview-image')">
            <img :src="previewSrc" />
          </div>
          <div :class="nh.be('preview-time')">
            {{ formatSeconds(hoveredTime) + segmentLabel }}
          </div>
        </slot>
      </div>
    </ResizeObserver>
  </div>
</template>
