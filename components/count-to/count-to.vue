<template>
  <div :class="className">
    {{ state.displayValue }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, onUnmounted } from 'vue'
import { countToProps } from '@/components/count-to/props'
import { countToEasingFnUtils } from '@/components/count-to/utils'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { isNumber } from '@vexip-ui/utils'
import type { EasingFn } from '@/components/count-to/props'

export default defineComponent({
  name: 'CountTo',
  props: countToProps,
  setup(_props, { expose }) {
    const props = useProps('countTo', _props, {
      start: 0,
      end: 0,
      autoplay: true,
      duration: 3000,
      decimal: '',
      decimals: {
        default: 0,
        validator(value) {
          return value >= 0
        }
      },
      separator: '',
      prefix: '',
      suffix: '',
      useEasing: true,
      easingFn: {
        default(): EasingFn {
          return countToEasingFnUtils.linear
        }
      }
    })

    const nh = useNameHelper('count-to')
    const className = computed(() => [nh.b()])

    const state = reactive({
      localStart: props.start,
      displayValue: formatCountToNumber(props.start),
      printVal: 0,
      paused: false,
      localDuration: props.duration,
      startTime: 0,
      timestamp: 0,
      remaining: 0,
      rAF: 0
    })

    const stopCount = computed(() => {
      return props.start > props.end
    })

    onMounted(() => {
      if (props.autoplay) {
        start()
      }
    })

    onUnmounted(() => {
      cancelAnimationFrame(state.rAF)
    })

    function formatCountToNumber(num: number) {
      const val = num.toFixed(props.decimals)

      const x = val.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? props.decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + props.separator + '$2')
        }
      }

      return `${props.prefix}${x1}${x2 ? '.' : ''}${x2}${props.suffix}`
    }

    function count(timestamp: number) {
      if (!state.startTime) {
        state.startTime = timestamp
      }
      state.timestamp = timestamp
      const progress = timestamp - state.startTime
      state.remaining = state.localDuration - progress

      if (props.useEasing) {
        if (stopCount.value) {
          state.printVal =
            state.localStart -
            props.easingFn(progress, 0, state.localStart - props.end, state.localDuration)
        } else {
          state.printVal = props.easingFn(
            progress,
            state.localStart,
            props.end - state.localStart,
            state.localDuration
          )
        }
      } else {
        if (stopCount.value) {
          state.printVal =
            state.localStart - (state.localStart - props.end) * (progress / state.localDuration)
        } else {
          state.printVal =
            state.localStart + (props.end - state.localStart) * (progress / state.localDuration)
        }
      }

      if (stopCount.value) {
        state.printVal = state.printVal < props.end ? props.end : state.printVal
      } else {
        state.printVal = state.printVal > props.end ? props.end : state.printVal
      }
      state.displayValue = formatCountToNumber(state.printVal)
      if (progress < state.localDuration) {
        state.rAF = requestAnimationFrame(count)
      }
    }

    function start() {
      cancelAnimationFrame(state.rAF)

      state.localStart = props.start
      state.startTime = 0
      state.localDuration = props.duration
      state.paused = false
      state.rAF = requestAnimationFrame(count)
    }

    function pause() {
      state.paused = true
      cancelAnimationFrame(state.rAF)
    }

    function resume() {
      cancelAnimationFrame(state.rAF)

      state.paused = false
      state.startTime = 0
      state.localDuration = +state.remaining
      state.localStart = +state.printVal
      requestAnimationFrame(count)
    }

    function toggle() {
      if (state.paused) {
        resume()
      } else {
        pause()
      }
    }

    expose({
      start,
      pause,
      resume,
      toggle
    })

    return {
      state,
      className
    }
  }
})
</script>
