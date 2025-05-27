<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { timelineItemProps } from './props'
import { TIMELINE_STATE, timelineItemTypes } from './symbol'

import type { ItemState } from './symbol'

defineOptions({ name: 'TimelineItem' })

const _props = defineProps(timelineItemProps)
const props = useProps('timelineItem', _props, {
  type: {
    default: 'primary',
    validator: value => timelineItemTypes.includes(value),
  },
  color: '',
  label: {
    default: null,
    static: true,
  },
  dashed: null,
  lineColor: null,
  spacing: null,
})

defineSlots<{
  default: () => any,
  signal: () => any,
  line: () => any
}>()

const timelineState = inject(TIMELINE_STATE, null)

const nh = useNameHelper('timeline')
const currentLabel = ref(props.label)
const content = ref<HTMLElement>()

const className = computed(() => {
  return {
    [nh.be('item')]: true,
    [nh.bem('item', props.type)]: timelineItemTypes.includes(props.type),
  }
})
const itemStyle = computed(() => {
  const spacing = props.spacing || props.spacing === 0 ? props.spacing : timelineState?.spacing
  const style: Record<string, any> = {
    [nh.cv('item-span')]: typeof spacing === 'number' ? `${spacing}px` : spacing,
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
    borderInlineStartStyle: isDashed ? ('dashed' as const) : undefined,
    borderInlineStartColor: color,
  }
})

defineExpose({ currentLabel, content })

if (timelineState) {
  const state: ItemState = reactive({
    label: currentLabel,
    index: 0,
    total: 0,
    height: 0,
  })

  timelineState.increaseItem(state)

  watch(() => timelineState.alternate, updateHeight)
  watch(() => timelineState.horizontal, updateHeight)

  onMounted(updateHeight)
  onUpdated(updateHeight)

  onBeforeUnmount(() => {
    timelineState.decreaseItem(state)
  })

  function updateHeight() {
    requestAnimationFrame(() => {
      if (timelineState?.horizontal && content.value) {
        state.height = content.value.scrollHeight
      }
    })
  }
}

function handleSignalClick() {
  emitEvent(props.onSignalClick, currentLabel.value)
  timelineState?.handleSignalClick(currentLabel.value)
}
</script>

<template>
  <div :class="className" :style="itemStyle">
    <div :class="nh.be('signal')" @click="handleSignalClick">
      <slot name="signal">
        <div :class="nh.be('pointer')"></div>
      </slot>
    </div>
    <div :class="nh.be('line')" :style="lineStyle">
      <slot name="line"></slot>
    </div>
    <div ref="content" :class="nh.be('content')">
      <slot></slot>
    </div>
  </div>
</template>
