<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useRtl } from '@vexip-ui/hooks'
import { boundRange } from '@vexip-ui/utils'

import type { LoadingOptions, LoadingPosition, LoadingState } from './symbol'

defineOptions({ name: 'Loading' })

const nh = useNameHelper('loading')
const { isRtl } = useRtl()
const visible = ref(false)
const strokeWidth = ref(2)
const state = ref<LoadingState>('default')
const position = ref<LoadingPosition>('top')
const percent = ref(0)

let maxPercent = 95

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm(state.value)]: state.value !== 'default',
  }
})

const style = computed(() => {
  return {
    [position.value]: '0',
    height: `${strokeWidth.value}px`,
  }
})

const fillerStyle = computed(() => {
  return {
    transform: `translateX(${((isRtl.value ? -1 : 1) * (percent.value - 100)) / 2}%) scaleX(${
      percent.value / 100
    })`,
  }
})

let timer: ReturnType<typeof setTimeout>
let interval: ReturnType<typeof setInterval>
let rafId: ReturnType<typeof requestAnimationFrame>

defineExpose({ visible, percent, startLoading })

onBeforeUnmount(() => {
  clearTimeout(timer)
  clearInterval(interval)
  cancelAnimationFrame(rafId)
})

function startLoading(options: LoadingOptions) {
  if (percent.value === 100) {
    clearTimeout(timer)

    visible.value = false
    percent.value = 0
    state.value = 'default'
    strokeWidth.value = 2
    position.value = 'top'
  }

  clearInterval(interval)

  const setLoading = () => {
    percent.value = boundRange(options.percent, 0, 100)
    state.value = options.state ?? state.value
    strokeWidth.value = boundRange(options.strokeWidth ?? 2, 1, 10)
    position.value = options.position ?? position.value
    maxPercent = boundRange(options.maxPercent ?? 95, percent.value, 95)

    if (percent.value === 100) {
      timer = setTimeout(() => {
        visible.value = false
      }, 500)
    } else {
      interval = setInterval(() => {
        percent.value += Math.floor(Math.random() * 3 + 1)

        if (percent.value >= maxPercent) {
          percent.value = maxPercent
          clearInterval(interval)
        }
      }, 500)
    }
  }

  maxPercent = 95

  rafId = requestAnimationFrame(() => {
    if (visible.value) {
      setLoading()
    } else {
      visible.value = true
      rafId = requestAnimationFrame(setLoading)
    }
  })
}
</script>

<template>
  <Transition :name="nh.ns('fade')" appear>
    <div
      v-show="visible"
      :class="className"
      role="progressbar"
      :style="style"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div :class="nh.be('filler')" :style="fillerStyle"></div>
    </div>
  </Transition>
</template>
