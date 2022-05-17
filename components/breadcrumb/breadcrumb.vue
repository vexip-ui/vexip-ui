<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide, watch, toRef } from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'
import { isNull, debounceMinor } from '@vexip-ui/utils'
import { BREADCRUMB_STATE } from './symbol'

import type { ItemState, BreadcrumbState } from './symbol'

const props = useConfiguredProps('breadcrumb', {
  separator: {
    type: String,
    default: '/'
  },
  border: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  }
})

export default defineComponent({
  name: 'Breadcrumb',
  props,
  emits: ['on-select', 'on-separator-click'],
  setup(props, { slots, emit }) {
    const prefix = 'vxp-breadcrumb'
    const itemStates = new Set<ItemState>()

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--border`]: props.border
      }
    })

    const refreshLabels = debounceMinor(() => {
      Array.from(itemStates).forEach((item, index) => {
        if (isNull(item.label)) {
          item.label = index + 1
        }
      })
    })

    const state: BreadcrumbState = reactive({
      separator: toRef(props, 'separator'),
      separatorRenderer: null,
      increaseItem,
      decreaseItem,
      handleSelect,
      refreshLabels,
      handleSeparatorClick
    })

    provide(BREADCRUMB_STATE, state)

    watch(
      () => slots.separator,
      value => {
        state.separatorRenderer = value ? data => value(data) : null
      },
      { immediate: true }
    )

    function increaseItem(item: ItemState) {
      itemStates.add(item)
      refreshLabels()
    }

    function decreaseItem(item: ItemState) {
      itemStates.delete(item)
      refreshLabels()
    }

    function handleSelect(label: string | number) {
      emit('on-select', label)
    }

    function handleSeparatorClick(label: string | number) {
      emit('on-separator-click', label)
    }

    return {
      className
    }
  }
})
</script>
