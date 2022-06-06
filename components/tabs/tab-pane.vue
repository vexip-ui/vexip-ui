<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  inject,
  watch,
  onBeforeUnmount,
  toRef
} from 'vue'
import { isDefined } from '@vexip-ui/utils'
import { TABS_STATE } from './symbol'

import type { ItemState } from './symbol'

export default defineComponent({
  name: 'TabPane',
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: null
    }
  },
  emits: ['toggle'],
  setup(props, { slots, emit }) {
    const tabsState = inject(TABS_STATE, null)

    const prefix = 'vxp-tabs'
    const active = ref(false)
    const currentLabel = ref(props.label)

    const className = computed(() => {
      const baseClass = `${prefix}__pane`

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
      emit('toggle', value)
    })

    if (tabsState) {
      const state: ItemState = reactive({
        label: currentLabel,
        icon: toRef(props, 'icon'),
        disabled: toRef(props, 'disabled'),
        labelRenderer: null
      })

      watch(
        () => slots.label,
        value => {
          state.labelRenderer = value ? data => value(data) : null
        },
        { immediate: true }
      )
      watch(currentLabel, (value, prevValue) => {
        if (isDefined(prevValue) && prevValue === tabsState.currentActive) {
          tabsState.handleActive(value)
        }
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
      className
    }
  }
})
</script>
