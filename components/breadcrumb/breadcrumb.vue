<template>
  <div :class="className">
    <slot>
      <BreadcrumbItem v-for="label in props.options" :key="label" :label="label">
        {{ label }}
      </BreadcrumbItem>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide, watch, toRef } from 'vue'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'
import { isNull, debounceMinor } from '@vexip-ui/utils'
import { BreadcrumbItem } from '@/components/breadcrumb-item'
import { BREADCRUMB_STATE } from './symbol'

import type { PropType } from 'vue'
import type { ItemState, BreadcrumbState } from './symbol'

export default defineComponent({
  name: 'Breadcrumb',
  components: {
    BreadcrumbItem
  },
  props: {
    separator: String,
    border: booleanProp,
    options: Array as PropType<string[]>
  },
  emits: ['select', 'separator-click'],
  setup(_props, { slots, emit }) {
    const props = useProps('breadcrumb', _props, {
      separator: '/',
      border: false,
      options: {
        default: () => [],
        static: true
      }
    })

    const nh = useNameHelper('breadcrumb')
    const itemStates = new Set<ItemState>()

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('border')]: props.border
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
      emit('select', label)
    }

    function handleSeparatorClick(label: string | number) {
      emit('separator-click', label)
    }

    return {
      props,
      className
    }
  }
})
</script>
