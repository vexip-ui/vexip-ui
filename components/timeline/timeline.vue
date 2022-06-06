<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide, toRef } from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'
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
    spacing: [Number, String]
  },
  emits: ['signal-click'],
  setup(_props, { emit }) {
    const props = useProps('timeline', _props, {
      pending: false,
      bothSides: false,
      dashed: false,
      lineColor: null,
      spacing: null
    })

    const prefix = 'vxp-timeline'
    const itemStates = new Set<ItemState>()

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--pending`]: props.pending,
        [`${prefix}--both-sides`]: props.bothSides
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
      emit('signal-click', label)
    }

    return {
      className
    }
  }
})
</script>
