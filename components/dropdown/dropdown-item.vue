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

<script lang="ts">
import { computed, defineComponent, inject, ref, toRef } from 'vue'

import { emitEvent, useNameHelper } from '@vexip-ui/config'
import { dropdownItemProps } from './props'
import { useLabel } from './hooks'
import { SELECT_HANDLER } from './symbol'

export default defineComponent({
  name: 'DropdownItem',
  props: dropdownItemProps,
  emits: [],
  setup(props) {
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
        [`${baseClass}--divided`]: props.divided
      }
    })

    function handleSelect() {
      if (props.disabled || isReference.value) {
        return
      }

      if (typeof parentSelectHandler === 'function') {
        parentSelectHandler([currentLabel.value!], [props.meta || {}])
      }

      emitEvent(props.onSelect!, currentLabel.value!)
    }

    return {
      wrapper,

      className,

      handleSelect
    }
  }
})
</script>
