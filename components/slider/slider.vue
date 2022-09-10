<template>
  <div
    :id="idFor"
    :class="className"
    tabindex="-1"
    @pointerdown="handleTrackDown"
    @touchstart="disableEvent"
  >
    <div ref="track" :class="nh.be('track')">
      <div :class="nh.be('filler')" :style="fillerStyle"></div>
    </div>
    <SliderTrigger
      v-if="props.range"
      ref="startTrigger"
      :value="truthValue[0]"
      :tip-transfer="props.tipTransfer"
      :hide-tip="props.hideTip"
      :vertical="props.vertical"
      :min="props.min"
      :max="props.max"
      :disabled="props.disabled"
      :loading="props.loading"
      :reverse="props.reverse"
      :sliding="sliding[0]"
      :style="startTriggerStyle"
    >
      <template #tip="{ value: startValue }">
        <slot name="tip" :value="startValue">
          {{ startValue }}
        </slot>
      </template>
    </SliderTrigger>
    <SliderTrigger
      ref="endTrigger"
      :value="truthValue[1]"
      :tip-transfer="props.tipTransfer"
      :hide-tip="props.hideTip"
      :vertical="props.vertical"
      :min="props.min"
      :max="props.max"
      :disabled="props.disabled"
      :loading="props.loading"
      :reverse="props.reverse"
      :sliding="sliding[1]"
      :style="endTriggerStyle"
    >
      <template #tip="{ value: endValue }">
        <slot name="tip" :value="endValue">
          {{ endValue }}
        </slot>
      </template>
    </SliderTrigger>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import SliderTrigger from './slider-trigger.vue'
import { useFieldStore } from '@/components/form'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  stateProp,
  createStateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { useSetTimeout } from '@vexip-ui/mixins'
import { throttle } from '@vexip-ui/utils'

import type { PropType } from 'vue'

const enum TriggerType {
  START = 0,
  END = 1
}

export default defineComponent({
  name: 'Slider',
  components: {
    SliderTrigger
  },
  props: {
    state: stateProp,
    value: [Number, Array] as PropType<number | number[]>,
    min: Number,
    max: Number,
    step: Number,
    vertical: booleanProp,
    hideTip: booleanProp,
    tipTransfer: booleanStringProp,
    disabled: booleanProp,
    loading: booleanProp,
    loadingLock: booleanProp,
    reverse: booleanProp,
    range: booleanProp,
    onChange: eventProp<(value: number | number[]) => void>(),
    onInput: eventProp<(value: number | number[]) => void>()
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
      useFieldStore<number | number[]>(() => (startTrigger.value || endTrigger.value)?.focus())

    const props = useProps('slider', _props, {
      state: createStateProp(state),
      value: {
        default: () => getFieldValue(0),
        static: true
      },
      min: 0,
      max: 100,
      step: {
        default: 1,
        validator: value => value > 0 && Math.ceil(value) === value
      },
      vertical: false,
      hideTip: false,
      tipTransfer: null,
      disabled: () => disabled.value,
      loading: () => loading.value,
      loadingLock: false,
      reverse: false,
      range: false
    })

    const nh = useNameHelper('slider')
    const currentValue = ref([0, 0]) // 按每 step 为 1 的 value
    const sliding = ref([false, false])
    const triggerType = ref(TriggerType.END)

    const { timer } = useSetTimeout()

    const track = ref<HTMLElement | null>(null)
    const startTrigger = ref<InstanceType<typeof SliderTrigger> | null>(null)
    const endTrigger = ref<InstanceType<typeof SliderTrigger> | null>(null)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.state)]: props.state !== 'default',
        [nh.bm('vertical')]: props.vertical,
        [nh.bm('sliding')]: sliding.value[1] || sliding.value[0],
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('loading')]: props.loading && props.loadingLock,
        [nh.bm('reverse')]: props.reverse
      }
    })
    // 按每 step 算的最小值
    const stepMin = computed(() => Math.round(Math.min(props.min, props.max) / props.step))
    // 按每 step 算的最大值
    const stepMax = computed(() => Math.round(Math.max(props.min, props.max) / props.step))
    const truthValue = computed(() => {
      return [
        Math.round(currentValue.value[0] * props.step),
        Math.round(currentValue.value[1] * props.step)
      ]
    })
    const total = computed(() => stepMax.value - stepMin.value || 1)
    const percent = computed(() => {
      return [
        ((currentValue.value[0] - stepMin.value) / total.value) * 100,
        ((currentValue.value[1] - stepMin.value) / total.value) * 100
      ]
    })
    const fillerStyle = computed(() => {
      const { vertical, reverse } = props
      const offset = props.range ? Math.min(percent.value[0], percent.value[1]) : 0

      return {
        transform: `
          translate${vertical ? 'Y' : 'X'}(${reverse ? '-' : ''}${offset}%)
          translateZ(0)
          scale${vertical ? 'Y' : 'X'}(${Math.abs(percent.value[0] - percent.value[1]) / 100})
        `,
        transformOrigin: `${vertical ? 50 : reverse ? 100 : 0}% ${
          vertical ? (reverse ? 100 : 0) : 50
        }%`
      }
    })
    const startTriggerStyle = computed(() => {
      const { vertical, reverse } = props

      return {
        [reverse ? 'bottom' : 'top']: vertical ? `${percent.value[0]}%` : '50%',
        [reverse ? 'right' : 'left']: vertical ? '50%' : `${percent.value[0]}%`,
        zIndex: triggerType.value === TriggerType.START ? 1 : undefined,
        transform: `translate(${reverse ? '' : '-'}50%, ${reverse ? '' : '-'}50%)`
      }
    })
    const endTriggerStyle = computed(() => {
      const { vertical, reverse } = props

      return {
        [reverse ? 'bottom' : 'top']: vertical ? `${percent.value[1]}%` : '50%',
        [reverse ? 'right' : 'left']: vertical ? '50%' : `${percent.value[1]}%`,
        zIndex: triggerType.value === TriggerType.END ? 1 : undefined,
        transform: `translate(${reverse ? '' : '-'}50%, ${reverse ? '' : '-'}50%)`
      }
    })

    parseValue(props.value)
    verifyValue()

    watch(
      () => props.value,
      value => {
        parseValue(value)
        verifyValue()
      }
    )

    function parseValue(value: number | number[]) {
      if (props.range) {
        const values = Array.isArray(value) ? value : [value, 100]

        currentValue.value = [values[0] / props.step, values[1] / props.step]
      } else {
        currentValue.value = [stepMin.value, (Array.isArray(value) ? value[0] : value) / props.step]
      }
    }

    function verifyValue() {
      currentValue.value = currentValue.value.map(value => {
        return Math.max(stepMin.value, Math.min(stepMax.value, Math.round(value)))
      })
    }

    function emitChange() {
      const [start, end] = truthValue.value
      const value = props.range ? (start > end ? [end, start] : [start, end]) : end

      setFieldValue(value)
      emitEvent(props.onChange, value)
      emit('update:value', value)
      validateField()
    }

    let trackRect: DOMRect | null = null

    function computeValue(event: PointerEvent) {
      if (!trackRect) return

      const vertical = props.vertical
      const reverse = props.reverse
      const client = vertical ? event.clientY : event.clientX

      currentValue.value[triggerType.value] =
        (reverse ? -1 : 1) *
          ((client -
            trackRect[vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left']) /
            trackRect[vertical ? 'height' : 'width']) *
          total.value +
        stepMin.value
    }

    const throttleMove = throttle((event: PointerEvent) => {
      if (!trackRect || props.disabled) return

      event.preventDefault()

      computeValue(event)
      verifyValue()

      if (startTrigger.value) {
        startTrigger.value.updateTooltip()
      }

      if (endTrigger.value) {
        endTrigger.value.updateTooltip()
      }

      const [start, end] = truthValue.value
      const value = props.range ? (start > end ? [end, start] : [start, end]) : end
      emitEvent(props.onInput, value)
    })

    function handleTrackDown(event: PointerEvent) {
      if (!track.value || props.disabled || (props.loading && props.loadingLock)) return

      clearTimeout(timer.sliding)
      event.stopPropagation()
      event.preventDefault()

      trackRect = track.value.getBoundingClientRect()

      if (props.range) {
        const { vertical, reverse } = props
        const client = vertical ? event.clientY : event.clientX
        const downPercent =
          ((reverse
            ? trackRect[vertical ? 'bottom' : 'right'] - client
            : client - trackRect[vertical ? 'top' : 'left']) /
            trackRect[vertical ? 'height' : 'width']) *
          100

        triggerType.value =
          Math.abs(downPercent - percent.value[0]) < Math.abs(downPercent - percent.value[1])
            ? TriggerType.START
            : TriggerType.END
      } else {
        triggerType.value = TriggerType.END
      }

      sliding.value[triggerType.value] = true

      computeValue(event)
      verifyValue()

      document.addEventListener('pointermove', handleMove)
      document.addEventListener('pointerup', handleMoveEnd)
    }

    function handleMove(event: PointerEvent) {
      throttleMove(event)
    }

    function handleMoveEnd() {
      trackRect = null

      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleMoveEnd)

      emitChange()

      timer.sliding = setTimeout(() => {
        sliding.value[triggerType.value] = false
      }, 250)
    }

    function disableEvent<E extends Event>(event: E) {
      if (event.cancelable) {
        event.stopPropagation()
        event.preventDefault()
      }
    }

    return {
      props,
      nh,
      idFor,
      sliding,

      className,
      truthValue,
      fillerStyle,
      startTriggerStyle,
      endTriggerStyle,

      track,
      startTrigger,
      endTrigger,

      handleTrackDown,
      disableEvent
    }
  }
})
</script>
