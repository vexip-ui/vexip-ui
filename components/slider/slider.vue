<template>
  <div :class="className" @mousedown="handleTrackDown">
    <div ref="track" :class="`${prefix}__track`">
      <div :class="`${prefix}__filler`" :style="fillerStyle"></div>
    </div>
    <div :class="`${prefix}__trigger`" :style="handlerStyle" @mousedown="handleMoveStart">
      <Tooltip
        ref="tooltip"
        tabindex="0"
        theme="dark"
        trigger="custom"
        :transfer="tipTransfer"
        :visible="isTipShow || sliding"
        :tip-class="`${prefix}__tip`"
        :disabled="hideTip"
        :placement="vertical ? 'right' : 'top'"
        @on-tip-enter="showTooltip"
        @on-tip-leave="hideTooltip"
      >
        <div
          :class="`${prefix}__handler`"
          @mouseenter="showTooltip"
          @mouseleave="hideTooltip"
        ></div>
        <template #tip>
          <slot name="tip" :value="truthValue">
            {{ truthValue }}
          </slot>
        </template>
      </Tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject, onMounted } from 'vue'
import { Tooltip } from '@/components/tooltip'
import { VALIDATE_FIELD } from '@/components/form-item'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { throttle } from '@/common/utils/performance'

const props = useConfiguredProps('slider', {
  value: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1,
    validator(value: number) {
      return Math.ceil(value) === value
    }
  },
  vertical: {
    type: Boolean,
    default: false
  },
  hideTip: {
    type: Boolean,
    default: false
  },
  tipTransfer: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Slider',
  components: {
    Tooltip
  },
  props,
  emits: ['on-change', 'on-input', 'on-change', 'update:value'],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-slider'
    const currentValue = ref(props.value) // 按每 step 为 1 的 value
    const sliding = ref(false)
    const isTipShow = ref(false)

    const track = ref<HTMLElement | null>(null)
    const tooltip = ref<InstanceType<typeof Tooltip> | null>(null)

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--vertical`]: props.vertical,
        [`${prefix}--sliding`]: sliding.value
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
      return currentValue.value * props.step
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
      emit('on-change', truthValue.value)
      emit('update:value', truthValue.value)

      if (!props.disableValidate) {
        validateField()
      }
    }

    function handleTrackDown(event: MouseEvent) {
      if (!track.value) return

      const vertical = props.vertical
      const client = vertical ? event.clientY : event.clientX
      const trackRect = track.value.getBoundingClientRect()

      currentValue.value =
        ((client - trackRect[vertical ? 'top' : 'left']) /
          trackRect[vertical ? 'height' : 'width']) *
          total.value +
        stepMin.value
      verifyValue()
      emitChange()
    }

    let trackRect: DOMRect | null = null

    const handleMove = throttle((event: MouseEvent) => {
      if (!trackRect) return

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

      emit('on-input', truthValue.value)
    })

    function handleMoveStart(event: MouseEvent) {
      if (!track.value) return

      event.stopPropagation()
      event.preventDefault()

      trackRect = track.value.getBoundingClientRect()
      sliding.value = true

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleMoveEnd)
    }

    function handleMoveEnd() {
      sliding.value = false
      trackRect = null

      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleMoveEnd)

      emitChange()
    }

    let hoverTimer: number

    function showTooltip() {
      window.clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
        isTipShow.value = true
      }, 250)
    }

    function hideTooltip() {
      window.clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
        isTipShow.value = false
      }, 250)
    }

    return {
      prefix,
      sliding,
      isTipShow,

      className,
      truthValue,
      fillerStyle,
      handlerStyle,

      track,
      tooltip,

      handleTrackDown,
      handleMoveStart,
      showTooltip,
      hideTooltip
    }
  }
})
</script>
