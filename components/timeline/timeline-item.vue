<template>
  <div :class="className" :style="itemStyle">
    <div :class="`${prefix}__signal`" :style="signalStyle" @click="handleSignalClick">
      <slot name="signal">
        <div :class="`${prefix}__pointer`" :style="pointerStyle"></div>
      </slot>
    </div>
    <div :class="`${prefix}__line`" :style="lineStyle"></div>
    <div ref="content" :class="`${prefix}__content`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, inject, onBeforeUnmount } from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { TTIMELINE_STATE } from './symbol'

import type { TimelinkItemType, ItemState, TimelineState } from './symbol'

const props = useConfiguredProps('timelineItem', {
  type: {
    default: 'normal' as TimelinkItemType,
    validator: (value: TimelinkItemType) => {
      return ['normal', 'success', 'error', 'warning', 'disabled', 'custom'].includes(value)
    }
  },
  color: {
    type: String,
    default: ''
  },
  label: {
    type: [Number, String],
    default: null
  },
  dashed: {
    type: Boolean,
    default: null
  },
  lineColor: {
    type: String,
    default: null
  },
  spacing: {
    type: [Number, String],
    default: null
  }
})

export default defineComponent({
  name: 'TimelineItem',
  props,
  emits: ['on-signal-click'],
  setup(props, { emit }) {
    const timelineState = inject<TimelineState | null>(TTIMELINE_STATE, null)

    const prefix = 'vxp-timeline'
    const currentLabel = ref(props.label)

    const className = computed(() => {
      return {
        [`${prefix}__item`]: true,
        [`${prefix}__item--${props.type}`]: props.type !== 'custom'
      }
    })
    const itemStyle = computed(() => {
      const spacing = props.spacing || props.spacing === 0 ? props.spacing : timelineState?.spacing

      return {
        paddingBottom: typeof spacing === 'number' ? `${spacing}px` : spacing
      }
    })
    const signalStyle = computed(() => {
      if (props.type === 'custom') {
        return { color: props.type }
      }

      return {}
    })
    const pointerStyle = computed(() => {
      if (props.type === 'custom') {
        return {
          color: props.type,
          borderColor: props.type
        }
      }

      return {}
    })
    const lineStyle = computed(() => {
      const isDashed = props.dashed ?? timelineState?.dashed ?? false
      const color = props.lineColor ?? timelineState?.lineColor

      return {
        borderLeftStyle: isDashed ? ('dashed' as const) : undefined,
        borderLeftColor: color
      }
    })

    if (timelineState) {
      const state: ItemState = reactive({
        label: currentLabel
      })

      timelineState.increaseItem(state)

      onBeforeUnmount(() => {
        timelineState.decreaseItem(state)
      })
    }

    function handleSignalClick() {
      emit('on-signal-click', currentLabel.value)
      timelineState?.handleSignalClick(currentLabel.value)
    }

    return {
      prefix,

      className,
      itemStyle,
      signalStyle,
      pointerStyle,
      lineStyle,

      handleSignalClick
    }
  }
})
</script>
