<template>
  <ol :class="className">
    <slot>
      <BreadcrumbItem v-for="option in normalizedOptions" :key="option.label" :label="option.label">
        {{ option.name ? callIfFunc(option.name) : option.label }}
      </BreadcrumbItem>
    </slot>
  </ol>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide, watch, toRef } from 'vue'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { isNull, debounceMinor, callIfFunc } from '@vexip-ui/utils'
import { BreadcrumbItem } from '@/components/breadcrumb-item'
import { breadcrumbProps } from './props'
import { BREADCRUMB_STATE } from './symbol'

import type { BreadcrumbItemState, BreadcrumbState } from './symbol'

export default defineComponent({
  name: 'Breadcrumb',
  components: {
    BreadcrumbItem
  },
  props: breadcrumbProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('breadcrumb', _props, {
      separator: '/',
      border: false,
      options: {
        default: () => [],
        static: true
      }
    })

    const nh = useNameHelper('breadcrumb')
    const itemStates = new Set<BreadcrumbItemState>()

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('border')]: props.border
      }
    })
    const normalizedOptions = computed(() => {
      return props.options.map(option => {
        if (typeof option === 'string') {
          return { label: option }
        }

        return option
      })
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

    function increaseItem(item: BreadcrumbItemState) {
      itemStates.add(item)
      refreshLabels()
    }

    function decreaseItem(item: BreadcrumbItemState) {
      itemStates.delete(item)
      refreshLabels()
    }

    function handleSelect(label: string | number) {
      emitEvent(props.onSelect, label)
    }

    function handleSeparatorClick(label: string | number) {
      emitEvent(props.onSeparatorClick, label)
    }

    return {
      props,
      className,
      normalizedOptions,

      callIfFunc
    }
  }
})
</script>
