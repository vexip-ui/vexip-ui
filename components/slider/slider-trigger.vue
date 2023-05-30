<template>
  <div
    ref="wrapper"
    :class="nh.be('trigger')"
    tabindex="-1"
    @touchstart="disableEvent"
  >
    <Tooltip
      ref="tooltip"
      theme="dark"
      trigger="custom"
      :transfer="tipTransfer"
      :visible="isTipShow || sliding"
      :tip-class="nh.be('tip')"
      :disabled="hideTip"
      :placement="vertical ? 'right' : 'top'"
      @tip-enter="showTooltip"
      @tip-leave="hideTooltip"
    >
      <template #trigger>
        <div
          ref="handler"
          :class="{
            [nh.be('handler')]: true,
            [nh.bem('handler', 'active')]: loading,
            [nh.bem('handler', 'sliding')]: sliding
          }"
          role="slider"
          tabindex="0"
          :aria-valuenow="value"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-disabled="disabled"
          @mouseenter="showTooltip"
          @mouseleave="hideTooltip"
        ></div>
      </template>
      <slot name="tip" :value="value">
        {{ value }}
      </slot>
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { Tooltip } from '@/components/tooltip'

import { defineComponent, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useModifier, useSetTimeout } from '@vexip-ui/hooks'

import type { TooltipExposed } from '@/components/tooltip'

export default defineComponent({
  name: 'SliderTrigger',
  components: {
    Tooltip
  },
  props: {
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
    }
  },
  emits: ['key-minus', 'key-plus'],
  setup(props, { emit }) {
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

    return {
      nh: useNameHelper('slider'),
      isTipShow,

      wrapper,
      tooltip,
      handler,

      showTooltip,
      hideTooltip,
      disableEvent,
      updateTooltip,

      focus: (options?: FocusOptions) => handler.value?.focus(options),
      blur: () => handler.value?.blur()
    }
  }
})
</script>
