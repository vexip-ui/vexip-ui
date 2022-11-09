<template>
  <div :class="className" role="tabpanel" :aria-hidden="!active">
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
import { useNameHelper, eventProp, emitEvent } from '@vexip-ui/config'
import { TABS_STATE } from './symbol'

import type { ItemState } from './symbol'

export default defineComponent({
  name: 'TabPanel',
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: null
    },
    closable: {
      type: Boolean,
      default: null
    },
    onToggle: eventProp<(active: boolean) => void>()
  },
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
      const state: ItemState = reactive({
        label: currentLabel,
        name: toRef(props, 'name'),
        icon: toRef(props, 'icon'),
        disabled: toRef(props, 'disabled'),
        closable: toRef(props, 'closable'),
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
