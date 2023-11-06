<script setup lang="ts">
import { Tooltip } from '@/components/tooltip'

import { computed, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useModifier, useSetTimeout } from '@vexip-ui/hooks'

import type { PropType } from 'vue'
import type { TooltipExposed } from '@/components/tooltip'
import type { SliderTipProps } from './symbol'

defineOptions({ name: 'SliderTrigger' })

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  tipTransfer: {
    type: [Boolean, String],
    default: false
  },
  hideTip: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  reverse: {
    type: Boolean,
    default: false
  },
  sliding: {
    type: Boolean,
    default: false
  },
  tipHover: {
    type: Boolean,
    default: false
  },
  tipProps: {
    type: Object as PropType<SliderTipProps>,
    default: () => ({})
  }
})

const emit = defineEmits(['key-minus', 'key-plus'])

defineSlots<{ default: () => any, tip: () => any }>()

const nh = useNameHelper('slider')

const isTipShow = ref(false)

const tooltip = ref<(InstanceType<typeof Tooltip> & TooltipExposed) | null>(null)
const handler = ref<HTMLElement>()

const { timer } = useSetTimeout()
const { target: wrapper } = useModifier({
  passive: false,
  onKeyDown: (event, modifier) => {
    if (modifier.up || modifier.down || modifier.left || modifier.right) {
      disableEvent(event)

      const extraType = event.ctrlKey
        ? 'ctrl'
        : event.shiftKey
          ? 'shift'
          : event.altKey
            ? 'alt'
            : undefined

      if (modifier.up || modifier.left) {
        emit('key-minus', extraType)
      } else {
        emit('key-plus', extraType)
      }
    }
  }
})

const tipClass = computed(() => [nh.be('tip'), props.tipProps?.tipClass])

defineExpose({ updateTooltip, focus, blur })

function showTooltip() {
  clearTimeout(timer.hover)

  if (!props.disabled) {
    timer.hover = setTimeout(() => {
      isTipShow.value = true
    }, 250)
  }
}

function hideTooltip() {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    isTipShow.value = false
  }, 250)
}

function disableEvent<E extends Event>(event: E) {
  if (event.cancelable) {
    event.stopPropagation()
    event.preventDefault()
  }
}

function updateTooltip() {
  if (tooltip.value) {
    tooltip.value.updatePopper()
  }
}

function focus(options?: FocusOptions) {
  handler.value?.focus(options)
}

function blur() {
  handler.value?.blur()
}
</script>

<template>
  <div
    ref="wrapper"
    :class="nh.be('trigger')"
    tabindex="-1"
    @touchstart="disableEvent"
  >
    <Tooltip
      ref="tooltip"
      :placement="vertical ? 'right' : 'top'"
      v-bind="tipProps"
      trigger="custom"
      :transfer="tipTransfer"
      :visible="isTipShow || sliding"
      :tip-class="tipClass"
      :disabled="hideTip"
      :no-hover="!tipHover"
      @tip-enter="showTooltip"
      @tip-leave="hideTooltip"
    >
      <template #trigger>
        <div
          ref="handler"
          :class="{
            [nh.be('button')]: true,
            [nh.bem('button', 'loading')]: loading,
            [nh.bem('button', 'sliding')]: sliding
          }"
          role="slider"
          tabindex="0"
          :aria-valuenow="value"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-disabled="disabled"
          @mouseenter="showTooltip"
          @mouseleave="hideTooltip"
        >
          <slot>
            <div :class="nh.be('handler')"></div>
          </slot>
        </div>
      </template>
      <slot name="tip">
        {{ value }}
      </slot>
    </Tooltip>
  </div>
</template>
