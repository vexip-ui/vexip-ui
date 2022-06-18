<template>
  <li
    ref="wrapper"
    :class="nh.be('item')"
    :aria-disabled="disabled"
    @click="handleSelect"
  >
    <div :class="nh.be('pad')"></div>
    <div :class="contentClass">
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
import { useNameHelper } from '@vexip-ui/config'
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
    }
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const tabNavState = inject(TAB_NAV_STATE, null)

    const nh = useNameHelper('tab-nav')
    const active = ref(false)
    const currentLabel = ref(props.label)

    const wrapper = ref<HTMLElement | null>(null)

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
      emit('toggle', value)
    })

    if (tabNavState) {
      const state: ItemState = reactive({
        el: wrapper,
        label: currentLabel
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
      contentClass,
      wrapper,
      handleSelect
    }
  }
})
</script>
