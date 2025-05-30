<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { debounceMinor, isNull } from '@vexip-ui/utils'
import { timelineProps } from './props'
import { TIMELINE_STATE } from './symbol'

import type { ItemState, TimelineState } from './symbol'

defineOptions({ name: 'Timeline' })

const _props = defineProps(timelineProps)
const props = useProps('timeline', _props, {
  pending: false,
  dashed: false,
  lineColor: null,
  spacing: null,
  flip: false,
  horizontal: false,
  alternate: false,
})

const nh = useNameHelper('timeline')
const itemStates = reactive(new Set<ItemState>())

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('pending')]: props.pending,
    [nh.bm('alternate')]: props.alternate,
    [nh.bm('flip')]: props.flip,
    [nh.bm('horizontal')]: props.horizontal,
  }
})
const height = computed(() => {
  return Math.max(...Array.from(itemStates).map(state => state.height)) * 2
})

defineExpose({ itemStates })

const refreshLabels = debounceMinor(() => {
  const total = itemStates.size

  Array.from(itemStates).forEach((item, index) => {
    item.index = index + 1
    item.total = total

    if (isNull(item.label)) {
      item.label = index + 1
    }
  })
})

const state: TimelineState = reactive({
  dashed: toRef(props, 'dashed'),
  lineColor: toRef(props, 'lineColor'),
  spacing: toRef(props, 'spacing'),
  alternate: toRef(props, 'alternate'),
  horizontal: toRef(props, 'horizontal'),
  increaseItem,
  decreaseItem,
  handleSignalClick,
})

provide(TIMELINE_STATE, state)

function increaseItem(item: ItemState) {
  itemStates.add(item)
  refreshLabels()
}

function decreaseItem(item: ItemState) {
  itemStates.delete(item)
  refreshLabels()
}

function handleSignalClick(label: string | number) {
  emitEvent(props.onSignalClick, label)
}
</script>

<template>
  <div
    :class="className"
    :style="{ height: props.horizontal && props.alternate ? `${height}px` : undefined }"
  >
    <slot></slot>
  </div>
</template>
