<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    tabindex="-1"
    @pointerdown="handleTrackDown"
    @touchstart="disableEvent"
  >
    <div ref="track" :class="nh.be('track')">
      <div :class="nh.be('filler')" :style="fillerStyle"></div>
    </div>
    <div
      :class="nh.be('trigger')"
      :style="handlerStyle"
      @pointerdown="handleMoveStart"
      @touchstart="disableEvent"
    >
      <Tooltip
        ref="tooltip"
        theme="dark"
        trigger="custom"
        :transfer="props.tipTransfer"
        :visible="isTipShow || sliding"
        :tip-class="nh.be('tip')"
        :disabled="props.hideTip"
        :placement="props.vertical ? 'right' : 'top'"
        @tip-enter="showTooltip"
        @tip-leave="hideTooltip"
      >
        <template #trigger>
          <div
            ref="handler"
            :class="[nh.be('handler'), props.loading && nh.bem('handler', 'active')]"
            role="slider"
            tabindex="0"
            :aria-valuenow="truthValue"
            :aria-valuemin="props.min"
            :aria-valuemax="props.max"
            :aria-disabled="props.disabled"
            @mouseenter="showTooltip"
            @mouseleave="hideTooltip"
          ></div>
        </template>
        <slot name="tip" :value="truthValue">
          {{ truthValue }}
        </slot>
      </Tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { Tooltip } from '@/components/tooltip'
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
import { useSetTimeout, useModifier } from '@vexip-ui/mixins'
import { throttle } from '@vexip-ui/utils'

import type { TooltipExposed } from '@/components/tooltip'

export default defineComponent({
  name: 'Slider',
  components: {
    Tooltip
  },
  props: {
    state: stateProp,
    value: Number,
    min: Number,
    max: Number,
    step: Number,
    vertical: booleanProp,
    hideTip: booleanProp,
    tipTransfer: booleanStringProp,
    disabled: booleanProp,
    loading: booleanProp,
    loadingLock: booleanProp,
    onChange: eventProp<(value: number) => void>(),
    onInput: eventProp<(value: number) => void>()
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
      useFieldStore<number>(() => handler.value?.focus())

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
        validator: (value: number) => value > 0 && Math.ceil(value) === value
      },
      vertical: false,
      hideTip: false,
      tipTransfer: null,
      disabled: () => disabled.value,
      loading: () => loading.value,
      loadingLock: false
    })

    const nh = useNameHelper('slider')
    const currentValue = ref(props.value / props.step) // 按每 step 为 1 的 value
    const sliding = ref(false)
    const isTipShow = ref(false)

    const { timer } = useSetTimeout()
    const { target: wrapper } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (modifier.up || modifier.down || modifier.left || modifier.right) {
          event.preventDefault()
          event.stopPropagation()

          if (modifier.up || modifier.left) {
            currentValue.value -= 1
          } else {
            currentValue.value += 1
          }

          verifyValue()
        }
      }
    })

    const track = ref<HTMLElement | null>(null)
    const tooltip = ref<(InstanceType<typeof Tooltip> & TooltipExposed) | null>(null)
    const handler = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.state)]: props.state !== 'default',
        [nh.bm('vertical')]: props.vertical,
        [nh.bm('sliding')]: sliding.value,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('loading')]: props.loading && props.loadingLock
      }
    })
    // 按每 step 算的最小值
    const stepMin = computed(() => {
      return Math.round(Math.min(props.min, props.max) / props.step)
    })
    // 按每 step 算的最大值
    const stepMax = computed(() => {
      return Math.round(Math.max(props.min, props.max) / props.step)
    })
    const truthValue = computed(() => {
      return Math.round(currentValue.value * props.step)
    })
    const total = computed(() => {
      return stepMax.value - stepMin.value || 1
    })
    const percent = computed(() => {
      return ((currentValue.value - stepMin.value) / total.value) * 100
    })
    const fillerStyle = computed(() => {
      return {
        top: props.vertical ? '0' : '50%',
        left: props.vertical ? '50%' : '0',
        [props.vertical ? 'height' : 'width']: `${percent.value}%`
      }
    })
    const handlerStyle = computed(() => {
      return {
        top: props.vertical ? `${percent.value}%` : '50%',
        left: props.vertical ? '50%' : `${percent.value}%`
      }
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value / props.step
        verifyValue()
      }
    )

    onMounted(() => {
      verifyValue()
    })

    function verifyValue() {
      currentValue.value = Math.max(
        stepMin.value,
        Math.min(stepMax.value, Math.round(currentValue.value))
      )
    }

    function emitChange() {
      setFieldValue(truthValue.value)
      emitEvent(props.onChange, truthValue.value)
      emit('update:value', truthValue.value)
      validateField()
    }

    let trackRect: DOMRect | null = null

    const throttleMove = throttle((event: MouseEvent) => {
      if (!trackRect || props.disabled) return

      event.preventDefault()

      const vertical = props.vertical
      const client = vertical ? event.clientY : event.clientX

      currentValue.value =
        ((client - trackRect[vertical ? 'top' : 'left']) /
          trackRect[vertical ? 'height' : 'width']) *
          total.value +
        stepMin.value
      verifyValue()

      if (tooltip.value) {
        tooltip.value.updatePopper()
      }

      emitEvent(props.onInput, truthValue.value)
    })

    function handleTrackDown(event: PointerEvent) {
      if (!track.value || props.disabled || (props.loading && props.loadingLock)) return

      window.clearTimeout(timer.sliding)
      event.stopPropagation()
      event.preventDefault()

      const vertical = props.vertical
      const client = vertical ? event.clientY : event.clientX

      trackRect = track.value.getBoundingClientRect()
      sliding.value = true

      currentValue.value =
        ((client - trackRect[vertical ? 'top' : 'left']) /
          trackRect[vertical ? 'height' : 'width']) *
          total.value +
        stepMin.value

      verifyValue()

      document.addEventListener('pointermove', handleMove)
      document.addEventListener('pointerup', handleMoveEnd)
    }

    function handleMoveStart(event: PointerEvent) {
      if (!track.value || props.disabled || (props.loading && props.loadingLock)) return

      window.clearTimeout(timer.sliding)
      event.stopPropagation()
      event.preventDefault()

      trackRect = track.value.getBoundingClientRect()
      sliding.value = true

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

      timer.sliding = window.setTimeout(() => {
        sliding.value = false
      }, 250)
    }

    function showTooltip() {
      window.clearTimeout(timer.hover)

      if (!props.disabled) {
        timer.hover = window.setTimeout(() => {
          isTipShow.value = true
        }, 250)
      }
    }

    function hideTooltip() {
      window.clearTimeout(timer.hover)

      timer.hover = window.setTimeout(() => {
        isTipShow.value = false
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
      isTipShow,

      className,
      truthValue,
      fillerStyle,
      handlerStyle,

      wrapper,
      track,
      tooltip,
      handler,

      handleTrackDown,
      handleMoveStart,
      showTooltip,
      hideTooltip,
      disableEvent
    }
  }
})
</script>
