<template>
  <ol :class="className">
    <slot>
      <BreadcrumbItem v-for="option in normalizedOptions" :key="option.label" :label="option.label">
        <slot name="item" :option="option">
          {{ option.name ? callIfFunc(option.name) : option.label }}
        </slot>
      </BreadcrumbItem>
    </slot>
  </ol>
</template>

<script lang="ts">
import { BreadcrumbItem } from '@/components/breadcrumb-item'

import { computed, defineComponent, provide, reactive, toRef, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { callIfFunc, debounceMinor, isNull } from '@vexip-ui/utils'
import { breadcrumbProps } from './props'
import { BREADCRUMB_STATE } from './symbol'

import type { BreadcrumbItemState, BreadcrumbOptions, BreadcrumbState, SelectEvent } from './symbol'

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
      },
      router: null
    })

    const nh = useNameHelper('breadcrumb')
    const itemStates = new Set<BreadcrumbItemState>()

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('border')]: props.border
      }
    })
    const normalizedOptions = computed(() => {
      if (props.router && !props.options?.length) {
        const matched = props.router.currentRoute.value.matched
        const options: BreadcrumbOptions[] = []

        for (const route of matched) {
          const meta = (route.meta || {}) as any

          if (meta.menu === false) {
            continue
          }

          options.push({
            label: meta.label || route.path,
            name: meta.name || route.name
          })
        }

        return options
      }

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
      emitEvent(props.onSelect as SelectEvent, label)
    }

    function handleSeparatorClick(label: string | number) {
      emitEvent(props.onSeparatorClick as SelectEvent, label)
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
