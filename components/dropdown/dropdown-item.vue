<template>
  <li ref="wrapper" :class="className" @click="handleSelect">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRef, inject } from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { useLabel } from './mixins'
import { DROP_SELECT_HANDLER } from './symbol'

const props = useConfiguredProps('dropdownItem', {
  label: {
    type: [String, Number],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  divided: {
    type: Boolean,
    default: false
  },
  reference: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'DropdownItem',
  props,
  emits: ['on-select'],
  setup(props, { emit }) {
    const parentSelectHandler = inject(DROP_SELECT_HANDLER, null)

    const baseClass = 'vxp-dropdown__item'
    const wrapper = ref(null)
    const label = toRef(props, 'label')
    const isReference = ref(props.reference)

    const currentLabel = useLabel(label, wrapper)

    const className = computed(() => {
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
        parentSelectHandler(currentLabel.value!)
      }

      emit('on-select', currentLabel.value)
    }

    return {
      wrapper,

      className,

      handleSelect
    }
  }
})
</script>
