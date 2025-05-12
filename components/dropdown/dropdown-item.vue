<script setup lang="ts">
import { computed, inject, ref, toRef } from 'vue'

import { emitEvent, useNameHelper } from '@vexip-ui/config'
import { dropdownItemProps } from './props'
import { useLabel } from './hooks'
import { SELECT_HANDLER } from './symbol'

defineOptions({ name: 'DropdownItem' })

const props = defineProps(dropdownItemProps)

const parentSelectHandler = inject(SELECT_HANDLER, null)

const nh = useNameHelper('dropdown')
const wrapper = ref(null)
const label = toRef(props, 'label')
const isReference = ref(props.reference)

const currentLabel = useLabel(label, wrapper)

const className = computed(() => {
  const baseClass = nh.be('item')

  return {
    [baseClass]: true,
    [`${baseClass}--disabled`]: props.disabled,
    [`${baseClass}--selected`]: !props.disabled && props.selected,
    [`${baseClass}--divided`]: props.divided,
  }
})

defineExpose({ wrapper, handleSelect })

function handleSelect() {
  if (props.disabled || isReference.value) {
    return
  }

  if (typeof parentSelectHandler === 'function') {
    parentSelectHandler([currentLabel.value!], [props.meta || {}])
  }

  emitEvent(props.onSelect!, currentLabel.value!)
}
</script>

<template>
  <li
    ref="wrapper"
    :class="className"
    role="menuitem"
    tabindex="0"
    @click="handleSelect"
  >
    <slot></slot>
  </li>
</template>
