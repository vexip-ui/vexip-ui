<template>
  <li ref="wrapper" :class="nh.be('item')" role="none">
    <div :class="nh.be('pad')"></div>
    <div
      :class="contentClass"
      role="tab"
      tabindex="0"
      :aria-disabled="disabled"
      :aria-setsize="total || undefined"
      :aria-posinset="index || undefined"
      @click="handleSelect"
      @keydown.enter.stop="handleSelect"
    >
      <Icon v-if="icon" :class="nh.be('icon')" :icon="icon"></Icon>
      <slot>
        {{ label }}
      </slot>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, inject, watch, onBeforeUnmount } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, eventProp, emitEvent } from '@vexip-ui/config'
import { isDefined } from '@vexip-ui/utils'
import { TAB_NAV_STATE } from './symbol'

import type { ItemState } from './symbol'

export default defineComponent({
  name: 'TabNavItem',
  components: {
    Icon
  },
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
    },
    onToggle: eventProp<(active: boolean) => void>()
  },
  emits: [],
  setup(props) {
    const tabNavState = inject(TAB_NAV_STATE, null)

    const nh = useNameHelper('tab-nav')
    const active = ref(false)
    const currentLabel = ref(props.label)
    const index = ref(0)
    const total = ref(0)

    const wrapper = ref<HTMLElement>()

    const contentClass = computed(() => {
      const baseClass = nh.be('content')

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
        tabNavState?.refreshLabels()
      }
    )
    watch(active, value => {
      emitEvent(props.onToggle!, value)
    })

    if (tabNavState) {
      const state: ItemState = reactive({
        el: wrapper,
        label: currentLabel,
        index,
        total
      })

      watch(currentLabel, (value, prevValue) => {
        if (isDefined(prevValue) && prevValue === tabNavState.currentActive) {
          tabNavState.handleActive(value)
        }
      })
      watch(
        () => tabNavState.currentActive,
        value => {
          active.value = currentLabel.value === value
        },
        { immediate: true }
      )

      tabNavState.increaseItem(state)

      onBeforeUnmount(() => {
        tabNavState.decreaseItem(state)
      })
    }

    function handleSelect() {
      if (props.disabled) {
        return
      }

      if (tabNavState) {
        tabNavState.handleActive(currentLabel.value)
      }
    }

    return {
      nh,
      index,
      total,
      contentClass,
      wrapper,
      handleSelect
    }
  }
})
</script>
