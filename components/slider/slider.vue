<script setup lang="ts">
import { useFieldStore } from '@/components/form'

import { computed, ref, watch } from 'vue'

import SliderTrigger from './slider-trigger.vue'
import { createStateProp, emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useSetTimeout } from '@vexip-ui/hooks'
import { decimalLength, throttle, toFixed } from '@vexip-ui/utils'
import { sliderProps } from './props'

import type { SliderCommonSlot, SliderMarker } from './symbol'

const enum TriggerType {
  START = 0,
  END = 1
}

defineOptions({ name: 'Slider' })

const { idFor, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
  useFieldStore<number | number[]>(focus)

const _props = defineProps(sliderProps)
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
    validator: value => value > 0
  },
  vertical: false,
  hideTip: false,
  tipTransfer: null,
  disabled: () => disabled.value,
  loading: () => loading.value,
  loadingLock: false,
  reverse: false,
  range: false,
  markers: () => ({}),
  markerOnly: false
})

const emit = defineEmits(['update:value'])

defineSlots<{
  trigger: SliderCommonSlot,
  tip: SliderCommonSlot,
  marker: (params: { marker: SliderMarker, value: number, inRange: boolean }) => any
}>()

const nh = useNameHelper('slider')
const stepOneValue = ref([0, 0]) // 按每 step 为 1 的 value
const sliding = ref([false, false])
const triggerType = ref(TriggerType.END)

const { timer } = useSetTimeout()

const track = ref<HTMLElement>()
const startTrigger = ref<InstanceType<typeof SliderTrigger>>()
const endTrigger = ref<InstanceType<typeof SliderTrigger>>()

const markerList = computed(() => {
  const list: { value: number, marker: string | SliderMarker }[] = []

  for (const value of Object.keys(props.markers)) {
    const number = parseFloat(value)

    if (!Number.isNaN(number)) {
      list.push({ value: number, marker: props.markers[value] })
    }
  }

  return list.sort((prev, next) => prev.value - next.value)
})
const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm(props.state)]: props.state !== 'default',
    [nh.bm('vertical')]: props.vertical,
    [nh.bm('sliding')]: sliding.value[1] || sliding.value[0],
    [nh.bm('disabled')]: props.disabled,
    [nh.bm('loading')]: props.loading && props.loadingLock,
    [nh.bm('reverse')]: props.reverse,
    [nh.bm('with-marker')]: markerList.value.length
  }
})
const stepDigit = computed(() => decimalLength(props.step))
// 按每 step 为 1 算的最小值
const stepOneMin = computed(() => Math.ceil(Math.min(props.min, props.max) / props.step))
// 按每 step 为 1 算的最大值
const stepOneMax = computed(() => Math.floor(Math.max(props.min, props.max) / props.step))
const truthValue = computed(() => {
  return [
    toFixed(stepOneValue.value[0] * props.step, stepDigit.value),
    toFixed(stepOneValue.value[1] * props.step, stepDigit.value)
  ]
})
const stepOneTotal = computed(() => stepOneMax.value - stepOneMin.value || 1)
const triggerPercent = computed(() => {
  return [toPercent(stepOneValue.value[0]), toPercent(stepOneValue.value[1])]
})
const fillerStyle = computed(() => {
  const { vertical, reverse } = props
  const offset = props.range ? Math.min(triggerPercent.value[0], triggerPercent.value[1]) : 0

  return {
    transform: `
          translate${vertical ? 'Y' : 'X'}(${reverse ? '-' : ''}${offset}%)
          translateZ(0)
          scale${vertical ? 'Y' : 'X'}(${
            Math.abs(triggerPercent.value[0] - triggerPercent.value[1]) / 100
          })
        `,
    transformOrigin: `${vertical ? 50 : reverse ? 100 : 0}% ${vertical ? (reverse ? 100 : 0) : 50}%`
  }
})
const startTriggerStyle = computed(() => {
  const { vertical, reverse } = props

  return {
    [reverse ? 'bottom' : 'top']: vertical ? `${triggerPercent.value[0]}%` : '50%',
    [reverse ? 'right' : 'left']: vertical ? '50%' : `${triggerPercent.value[0]}%`,
    zIndex: triggerType.value === TriggerType.START ? 1 : undefined,
    transform: `translate(${reverse ? '' : '-'}50%, ${reverse ? '' : '-'}50%)`
  }
})
const endTriggerStyle = computed(() => {
  const { vertical, reverse } = props

  return {
    [reverse ? 'bottom' : 'top']: vertical ? `${triggerPercent.value[1]}%` : '50%',
    [reverse ? 'right' : 'left']: vertical ? '50%' : `${triggerPercent.value[1]}%`,
    zIndex: triggerType.value === TriggerType.END ? 1 : undefined,
    transform: `translate(${reverse ? '' : '-'}50%, ${reverse ? '' : '-'}50%)`
  }
})
const readOnly = computed(() => props.disabled || (props.loading && props.loadingLock))

parseValue(props.value)
verifyValue()

watch(
  () => props.value,
  (value, prevValue) => {
    if (
      Array.isArray(value) &&
      Array.isArray(prevValue) &&
      value[0] === prevValue[0] &&
      value[1] === prevValue[1]
    ) {
      return
    }

    parseValue(value)
    verifyValue()
  }
)
watch(
  () => props.step,
  () => {
    parseValue(props.value)
    verifyValue()
  }
)

defineExpose({
  idFor,
  sliding,
  track,
  startTrigger,
  endTrigger,
  isValueInRange,
  focus,
  blur
})

function toPercent(value: string | number) {
  return ((parseFloat(value as string) - stepOneMin.value) / stepOneTotal.value) * 100
}

function parseValue(value: number | number[]) {
  if (props.range) {
    const values = Array.isArray(value) ? value : [value, 100]

    stepOneValue.value = [values[0] / props.step, values[1] / props.step]
  } else {
    stepOneValue.value = [stepOneMin.value, (Array.isArray(value) ? value[0] : value) / props.step]
  }
}

function verifyValue() {
  stepOneValue.value = stepOneValue.value.map(value => {
    let computedValue = Math.max(stepOneMin.value, Math.min(stepOneMax.value, Math.round(value)))

    if (props.markerOnly && markerList.value.length) {
      let nearest = Infinity
      let nearestMarker = 0

      for (const { value } of markerList.value) {
        const delta = Math.abs(computedValue * props.step - value)

        if (nearest > delta) {
          nearest = delta
          nearestMarker = value
        }
      }

      computedValue = nearestMarker / props.step
    }

    return computedValue
  })
}

function emitChange() {
  const [start, end] = truthValue.value
  const value = props.range ? (start > end ? [end, start] : [start, end]) : end

  emit('update:value', value)
  setFieldValue(value)
  emitEvent(props.onChange, value)
  validateField()
}

let trackRect: DOMRect | null = null

function computePointedValue(event: PointerEvent) {
  if (!trackRect) return

  const vertical = props.vertical
  const reverse = props.reverse
  const client = vertical ? event.clientY : event.clientX

  stepOneValue.value[triggerType.value] =
    (reverse ? -1 : 1) *
      ((client - trackRect[vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left']) /
        trackRect[vertical ? 'height' : 'width']) *
      stepOneTotal.value +
    stepOneMin.value
}

let lastValue: number | number[]

function isEqualValue(prev: number | number[], current: number | number[]) {
  if (Array.isArray(prev) && Array.isArray(current)) {
    return prev[0] === current[0] && prev[1] === current[1]
  }

  return prev === current
}

const throttleMove = throttle((event: PointerEvent) => {
  if (!trackRect || props.disabled) return

  event.preventDefault()

  computePointedValue(event)
  verifyValue()

  if (startTrigger.value) {
    startTrigger.value.updateTooltip()
  }

  if (endTrigger.value) {
    endTrigger.value.updateTooltip()
  }

  const [start, end] = truthValue.value
  const value = props.range ? (start > end ? [end, start] : [start, end]) : end

  if (!isEqualValue(lastValue, value)) {
    lastValue = value
    emitEvent(props.onInput, value)
  }
})

function handleTrackDown(event: PointerEvent) {
  if (!track.value || readOnly.value) return

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
      Math.abs(downPercent - triggerPercent.value[0]) <
      Math.abs(downPercent - triggerPercent.value[1])
        ? TriggerType.START
        : TriggerType.END
  } else {
    triggerType.value = TriggerType.END
  }

  sliding.value[triggerType.value] = true

  computePointedValue(event)
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

function getPointStyle(value: number | string) {
  const { vertical, reverse } = props
  value = toPercent(value)

  return {
    [reverse ? 'bottom' : 'top']: vertical ? `${value}%` : '50%',
    [reverse ? 'right' : 'left']: vertical ? '50%' : `${value}%`,
    transform: `translate(${reverse ? '' : '-'}50%, ${reverse ? '' : '-'}50%)`
  }
}

function getMarkerStyle(value: number | string) {
  const { vertical, reverse } = props
  value = toPercent(value)

  return {
    [reverse ? 'bottom' : 'top']: vertical ? `${value}%` : undefined,
    [reverse ? 'right' : 'left']: vertical ? undefined : `${value}%`,
    transform: `translate${vertical ? 'Y' : 'X'}(${reverse ? '' : '-'}50%)`
  }
}

function isValueInRange(value: number | string) {
  const number = parseFloat(value as string)

  if (Number.isNaN(number)) return false

  if (props.range) {
    const min = Math.min(truthValue.value[0], truthValue.value[1])
    const max = Math.max(truthValue.value[0], truthValue.value[1])

    return number >= min && number <= max
  } else {
    return number <= truthValue.value[1]
  }
}

function adjustValue(type: TriggerType, delta: number, emitEvent = false) {
  stepOneValue.value[type] += delta

  verifyValue()
  emitEvent && emitChange()
}

function handlePlus(type: TriggerType, extra: 'ctrl' | 'shift' | 'alt') {
  if (readOnly.value) return

  if (props.markerOnly || extra === 'alt') {
    if (!markerList.value.length) return

    const value = truthValue.value[type]

    for (const { value: markerValue } of markerList.value) {
      if (markerValue > value) {
        stepOneValue.value[type] = markerValue
        break
      }
    }

    emitChange()
  } else {
    adjustValue(type, extra === 'shift' ? 5 : extra === 'ctrl' ? 20 : 1, true)
  }
}

function handleMinus(type: TriggerType, extra: 'ctrl' | 'shift' | 'alt') {
  if (readOnly.value) return

  if (props.markerOnly || extra === 'alt') {
    if (!markerList.value.length) return

    const value = truthValue.value[type]

    for (let i = markerList.value.length - 1; i >= 0; --i) {
      const { value: markerValue } = markerList.value[i]

      if (markerValue < value) {
        stepOneValue.value[type] = markerValue
        break
      }
    }

    emitChange()
  } else {
    adjustValue(type, extra === 'shift' ? -5 : extra === 'ctrl' ? -20 : -1)
  }
}

function focus(options?: FocusOptions) {
  (startTrigger.value || endTrigger.value)?.focus(options)
}

function blur() {
  (startTrigger.value || endTrigger.value)?.blur()
}
</script>

<template>
  <div
    :id="idFor"
    :class="className"
    tabindex="-1"
    @pointerdown="handleTrackDown"
    @touchstart="disableEvent"
  >
    <div :class="nh.be('container')">
      <div ref="track" :class="nh.be('track')">
        <div :class="nh.be('filler')" :style="fillerStyle"></div>
      </div>
      <template v-if="markerList.length">
        <div :class="nh.be('points')">
          <div
            v-for="{ value } in markerList"
            :key="value"
            :class="[nh.be('point'), isValueInRange(value) && nh.bem('point', 'in-range')]"
            :style="getPointStyle(value)"
          ></div>
        </div>
        <div :class="nh.be('markers')">
          <template v-for="{ value, marker } in markerList" :key="value">
            <div
              v-if="typeof marker === 'string'"
              :class="nh.be('marker')"
              :style="getMarkerStyle(value)"
            >
              <slot
                name="marker"
                :marker="{ label: marker }"
                :value="value"
                :in-range="isValueInRange(value)"
              >
                {{ marker }}
              </slot>
            </div>
            <div
              v-else
              v-bind="marker.attrs"
              :class="[nh.be('marker'), marker.class]"
              :style="[getMarkerStyle(value), marker.style as any]"
            >
              <slot
                name="marker"
                :marker="marker"
                :value="value"
                :in-range="isValueInRange(value)"
              >
                {{ marker.label }}
              </slot>
            </div>
          </template>
        </div>
      </template>
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
        @key-plus="handlePlus(0, $event)"
        @key-minus="handleMinus(0, $event)"
      >
        <template #default="payload">
          <slot v-if="$slots.trigger" name="trigger" v-bind="payload"></slot>
        </template>
        <template #tip="payload">
          <slot name="tip" v-bind="payload">
            {{ payload.value.toFixed(stepDigit) }}
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
        @key-plus="handlePlus(1, $event)"
        @key-minus="handleMinus(1, $event)"
      >
        <template #default="payload">
          <slot v-if="$slots.trigger" name="trigger" v-bind="payload"></slot>
        </template>
        <template #tip="payload">
          <slot name="tip" v-bind="payload">
            {{ payload.value.toFixed(stepDigit) }}
          </slot>
        </template>
      </SliderTrigger>
    </div>
  </div>
</template>
