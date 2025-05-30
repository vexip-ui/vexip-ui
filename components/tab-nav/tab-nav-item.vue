<script setup lang="ts">
import { Icon } from '@/components/icon'

import { computed, inject, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { createIconProp, emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { isDefined } from '@vexip-ui/utils'
import { tabNavItemProps } from './props'
import { TAB_NAV_STATE } from './symbol'

import type { ItemState } from './symbol'

defineOptions({ name: 'TabNavItem' })

const _props = defineProps(tabNavItemProps)
const props = useProps('tabNavItem', _props, {
  label: {
    static: true,
    default: null,
  },
  disabled: false,
  icon: createIconProp(),
  closable: null,
})

const tabNavState = inject(TAB_NAV_STATE, null)

const nh = useNameHelper('tab-nav')
const icons = useIcons()
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
    [`${baseClass}--active`]: !props.disabled && active.value,
  }
})
const isClosable = computed(() => {
  if (isDefined(props.closable)) {
    return props.closable
  }

  return tabNavState?.closable ?? false
})

watch(
  () => props.label,
  value => {
    currentLabel.value = value
    tabNavState?.refreshLabels()
  },
)
watch(active, value => {
  emitEvent(props.onToggle!, value)
})

if (tabNavState) {
  const state: ItemState = reactive({
    el: wrapper,
    label: currentLabel,
    index,
    total,
  })

  watch(currentLabel, () => {
    active.value = currentLabel.value === tabNavState.currentActive
  })
  watch(
    () => tabNavState.currentActive,
    value => {
      active.value = currentLabel.value === value
    },
    { immediate: true },
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

  tabNavState?.handleActive(currentLabel.value)
}

function handleClose() {
  if (props.disabled) {
    return
  }

  tabNavState?.handleClose(currentLabel.value)
}
</script>

<template>
  <li ref="wrapper" :class="nh.be('item')" role="none">
    <div :class="nh.be('pad')"></div>
    <div
      :class="contentClass"
      role="tab"
      tabindex="0"
      :aria-disabled="props.disabled"
      :aria-setsize="total || undefined"
      :aria-posinset="index || undefined"
      @click="handleSelect"
      @keydown.enter.stop="handleSelect"
    >
      <Icon v-if="props.icon" :class="nh.be('icon')" :icon="props.icon"></Icon>
      <slot>
        {{ props.label }}
      </slot>
      <button
        v-if="isClosable"
        type="button"
        :class="nh.be('close')"
        @click.stop="handleClose"
      >
        <Icon v-bind="icons.close" label="close"></Icon>
      </button>
    </div>
  </li>
</template>
