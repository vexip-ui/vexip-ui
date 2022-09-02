<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide, toRef } from 'vue'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { isNull, debounceMinor } from '@vexip-ui/utils'
import { TIMELINE_STATE } from './symbol'

import type { ItemState, TimelineState } from './symbol'

export default defineComponent({
  name: 'Timeline',
  props: {
    pending: booleanProp,
    bothSides: booleanProp,
    dashed: booleanProp,
    lineColor: String,
    spacing: [Number, String],
    onSignalClick: eventProp<(label: string | number) => void>()
  },
  emits: [],
  setup(_props) {
    const props = useProps('timeline', _props, {
      pending: false,
      bothSides: false,
      dashed: false,
      lineColor: null,
      spacing: null
    })

    const nh = useNameHelper('timeline')
    const itemStates = new Set<ItemState>()

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('pending')]: props.pending,
        [nh.bm('both-sides')]: props.bothSides
      }
    })

    const refreshLabels = debounceMinor(() => {
      Array.from(itemStates).forEach((item, index) => {
        if (isNull(item.label)) {
          item.label = index + 1
        }
      })
    })

    const state: TimelineState = reactive({
      dashed: toRef(props, 'dashed'),
      lineColor: toRef(props, 'lineColor'),
      spacing: toRef(props, 'spacing'),
      increaseItem,
      decreaseItem,
      handleSignalClick
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

    return {
      className
    }
  }
})
</script>
