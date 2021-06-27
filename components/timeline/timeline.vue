<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide, toRef } from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { isNull } from '@/common/utils/common'
import { debounceMinor } from '@/common/utils/performance'
import { TIMELINE_STATE } from './symbol'

import type { ItemState, TimelineState } from './symbol'

const props = useConfiguredProps('timeline', {
  pending: {
    type: Boolean,
    default: false
  },
  bothSides: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
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
  name: 'Timeline',
  props,
  emits: ['on-signal-click'],
  setup(props, { emit }) {
    const prefix = 'vxp-timeline'
    const itemStates = new Set<ItemState>()

    const className = computed(() => {
      return {
        [prefix]: true,
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
      emit('on-signal-click', label)
    }

    return {
      className
    }
  }
})
</script>
