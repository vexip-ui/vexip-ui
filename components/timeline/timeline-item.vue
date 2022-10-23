<template>
  <div :class="className" :style="itemStyle">
    <div :class="nh.be('signal')" @click="handleSignalClick">
      <slot name="signal">
        <div :class="nh.be('pointer')"></div>
      </slot>
    </div>
    <div :class="nh.be('line')" :style="lineStyle"></div>
    <div ref="content" :class="nh.be('content')">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, inject, onBeforeUnmount } from 'vue'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { TIMELINE_STATE } from './symbol'

import type { PropType } from 'vue'
import type { TimelinkItemType, ItemState } from './symbol'

const timelineItemTypes = Object.freeze<TimelinkItemType>([
  'default',
  'success',
  'error',
  'warning',
  'disabled'
])

export default defineComponent({
  name: 'TimelineItem',
  props: {
    type: String as PropType<TimelinkItemType>,
    color: String,
    label: [Number, String],
    dashed: booleanProp,
    lineColor: String,
    spacing: [Number, String],
    onSignalClick: eventProp<(label: string | number) => void>()
  },
  emits: [],
  setup(_props) {
    const props = useProps('timelineItem', _props, {
      type: {
        default: 'default',
        validator: value => timelineItemTypes.includes(value)
      },
      color: '',
      label: {
        default: null,
        static: true
      },
      dashed: null,
      lineColor: null,
      spacing: null
    })

    const timelineState = inject(TIMELINE_STATE, null)

    const nh = useNameHelper('timeline')
    const currentLabel = ref(props.label)

    const className = computed(() => {
      return {
        [nh.be('item')]: true,
        [nh.bem('item', props.type)]: props.type !== 'default'
      }
    })
    const itemStyle = computed(() => {
      const spacing = props.spacing || props.spacing === 0 ? props.spacing : timelineState?.spacing
      const style: Record<string, any> = {
        [nh.cv('item-span')]: typeof spacing === 'number' ? `${spacing}px` : spacing
      }

      if (props.color) {
        style[nh.cv('pointer-color')] = props.color
        style[nh.cv('pointer-b-color')] = props.color
      }

      return style
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
      emitEvent(props.onSignalClick, currentLabel.value)
      timelineState?.handleSignalClick(currentLabel.value)
    }

    return {
      nh,

      className,
      itemStyle,
      lineStyle,

      handleSignalClick
    }
  }
})
</script>
