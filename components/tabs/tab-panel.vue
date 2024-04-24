<template>
  <div :class="className" role="tabpanel" :aria-hidden="!active">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  reactive,
  ref,
  toRef,
  watch
} from 'vue'

import { emitEvent, useNameHelper } from '@vexip-ui/config'
import { tabPanelProps } from './props'
import { TABS_STATE } from './symbol'

import type { ItemState } from './symbol'

export default defineComponent({
  name: 'TabPanel',
  props: tabPanelProps,
  emits: [],
  setup(props, { slots }) {
    const tabsState = inject(TABS_STATE, null)

    const nh = useNameHelper('tabs')
    const active = ref(false)
    const currentLabel = ref(props.label)

    const className = computed(() => {
      const baseClass = nh.be('panel')

      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: props.disabled,
        [`${baseClass}--active`]: !props.disabled && active.value
      }
    })

    watch(
      () => props.label,
      value => {
        currentLabel.value = value
        tabsState?.refreshLabels()
      }
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
        labelRenderer: null
      }) as ItemState

      watch(
        () => slots.label,
        value => {
          state.labelRenderer = value ? data => value(data) : null
        },
        { immediate: true }
      )
      watch(currentLabel, () => {
        active.value = currentLabel.value === tabsState.currentActive
      })
      watch(
        () => tabsState.currentActive,
        value => {
          active.value = currentLabel.value === value
        },
        { immediate: true }
      )

      tabsState.increaseItem(state)

      onBeforeUnmount(() => {
        tabsState.decreaseItem(state)
      })
    }

    return {
      active,
      className
    }
  }
})
</script>
