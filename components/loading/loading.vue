<template>
  <transition name="vxp-fade" appear>
    <div v-show="visible" :class="className" :style="style">
      <div :class="`${prefix}__filler`" :style="fillerStyle"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { boundRange } from '@/common/utils/number'

import type { LoadingState, LoadingPosition, LoadingOptions } from './symbol'

export default defineComponent({
  name: 'Loading',
  setup() {
    const prefix = 'vxp-loading'
    const visible = ref(false)
    const strokeWidth = ref(2)
    const state = ref<LoadingState>('default')
    const position = ref<LoadingPosition>('top')
    const percent = ref(0)

    let maxPercent = 95

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--${state.value}`]: state.value !== 'default'
      }
    })

    const style = computed(() => {
      return {
        [position.value]: '0',
        height: `${strokeWidth.value}px`
      }
    })

    const fillerStyle = computed(() => {
      return {
        transform: `translateX(${(percent.value - 100) / 2}%) scaleX(${percent.value / 100})`
      }
    })

    let timer: number
    let interval: number

    function startLoading(options: LoadingOptions) {
      if (percent.value === 100) {
        window.clearTimeout(timer)

        visible.value = false
        percent.value = 0
        state.value = 'default'
        strokeWidth.value = 2
        position.value = 'top'
      }

      window.clearInterval(interval)

      const setLoading = () => {
        percent.value = boundRange(options.percent, 0, 100)
        state.value = options.state ?? 'default'
        strokeWidth.value = boundRange(options.strokeWidth ?? 2, 1, 10)
        position.value = options.position ?? 'top'
        maxPercent = boundRange(options.maxPercent ?? 95, percent.value, 95)

        if (percent.value === 100) {
          timer = window.setTimeout(() => {
            visible.value = false
          }, 500)
        } else {
          interval = window.setInterval(() => {
            percent.value += Math.floor(Math.random() * 3 + 1)

            if (percent.value >= maxPercent) {
              percent.value = maxPercent
              window.clearInterval(interval)
            }
          }, 500)
        }
      }

      maxPercent = 95

      requestAnimationFrame(() => {
        if (visible.value) {
          setLoading()
        } else {
          visible.value = true
          requestAnimationFrame(setLoading)
        }
      })
    }

    return {
      prefix,
      visible,

      className,
      style,
      fillerStyle,

      startLoading
    }
  }
})
</script>
