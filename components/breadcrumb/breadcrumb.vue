<script setup lang="ts">
import { BreadcrumbItem } from '@/components/breadcrumb-item'
import { Renderer } from '@/components/renderer'

import { computed, provide, reactive, toRef, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { callIfFunc, debounceMinor, isNull } from '@vexip-ui/utils'
import { breadcrumbProps } from './props'
import { BREADCRUMB_STATE } from './symbol'

import type {
  BreadcrumbItemState,
  BreadcrumbOptions,
  BreadcrumbSlots,
  BreadcrumbState,
  SelectEvent,
} from './symbol'

defineOptions({ name: 'Breadcrumb' })

const _props = defineProps(breadcrumbProps)
const props = useProps('breadcrumb', _props, {
  separator: '/',
  border: false,
  options: {
    default: () => [],
    static: true,
  },
  router: null,
  slots: () => ({}),
})

const slots = defineSlots<BreadcrumbSlots>()

const nh = useNameHelper('breadcrumb')
const itemStates = new Set<BreadcrumbItemState>()

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('border')]: props.border,
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
        name: meta.name || route.name,
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
  handleSeparatorClick,
})

provide(BREADCRUMB_STATE, state)

watch(
  [() => slots.separator, () => props.slots.separator],
  ([slotValue, propValue]) => {
    state.separatorRenderer = slotValue
      ? data => slotValue(data)
      : propValue
        ? data => propValue(data)
        : null
  },
  { immediate: true },
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
</script>

<template>
  <ol :class="className">
    <slot>
      <Renderer :renderer="props.slots.default">
        <BreadcrumbItem
          v-for="(option, index) in normalizedOptions"
          :key="option.label"
          :label="option.label"
        >
          <slot name="item" :option="option" :index="index">
            <Renderer :renderer="props.slots.item" :data="{ option, index }">
              {{ option.name ? callIfFunc(option.name) : option.label }}
            </Renderer>
          </slot>
        </BreadcrumbItem>
      </Renderer>
    </slot>
  </ol>
</template>
