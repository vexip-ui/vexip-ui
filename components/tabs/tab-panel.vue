<script setup lang="ts">
import { computed, inject, onBeforeUnmount, reactive, ref, toRef, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { tabPanelProps } from './props'
import { TABS_STATE } from './symbol'

import type { ItemState } from './symbol'

defineOptions({ name: 'TabPanel' })

const _props = defineProps(tabPanelProps)
const props = useProps('tabPanel', _props, {
  lazy: null,
  lazyLoad: null,
})

const slots = defineSlots<{
  default?: () => any,
  label?: (params: { label: string | number }) => any,
}>()

const tabsState = inject(TABS_STATE, null)

const nh = useNameHelper('tabs')
const active = ref(false)
const currentLabel = ref(props.label)
const loaded = ref(false)

const lazy = computed(() => props.lazy ?? tabsState?.lazy ?? false)
const lazyLoad = computed(() => props.lazyLoad ?? tabsState?.lazyLoad ?? false)
const className = computed(() => {
  const baseClass = nh.be('panel')

  return {
    [baseClass]: true,
    [`${baseClass}--disabled`]: props.disabled,
    [`${baseClass}--lazy`]: lazy.value,
    [`${baseClass}--active`]: !props.disabled && active.value,
  }
})

watch(
  () => props.label,
  value => {
    currentLabel.value = value
    tabsState?.refreshLabels()
  },
)
watch(active, value => {
  emitEvent(props.onToggle!, value)
})

if (tabsState) {
  const state = reactive({
    label: currentLabel,
    name: toRef(props, 'name'),
    icon: toRef(props, 'icon'),
    disabled: toRef(props, 'disabled'),
    closable: toRef(props, 'closable'),
    labelRenderer: null,
  }) as ItemState

  watch(
    () => slots.label,
    value => {
      state.labelRenderer = value ? data => value(data) : null
    },
    { immediate: true },
  )
  watch(currentLabel, () => {
    active.value = currentLabel.value === tabsState.currentActive
  })
  watch(
    () => tabsState.currentActive,
    value => {
      active.value = currentLabel.value === value

      if (!loaded.value && active.value) {
        loaded.value = true
      }
    },
    { immediate: true },
  )

  tabsState.increaseItem(state)

  onBeforeUnmount(() => {
    tabsState.decreaseItem(state)
  })
}
</script>

<template>
  <div
    v-if="!(lazy || (lazyLoad && !loaded)) || active"
    :class="className"
    role="tabpanel"
    :aria-hidden="!active"
  >
    <slot></slot>
  </div>
</template>
