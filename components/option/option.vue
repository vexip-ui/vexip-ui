<template>
  <li
    ref="wrapper"
    :class="className"
    :title="noTitle ? undefined : String(value)"
    @click="handleSelect"
  >
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

const props = {
  value: {
    type: [String, Number],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  divided: {
    type: Boolean,
    default: false
  },
  noTitle: {
    type: Boolean,
    default: false
  },
  hitting: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  }
}

export default defineComponent({
  name: 'Option',
  props,
  emits: ['select'],
  setup(props, { emit }) {
    const prefix = 'vxp-option'
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--selected`]: !props.disabled && props.selected,
        [`${prefix}--divided`]: props.divided,
        [`${prefix}--hitting`]: props.hitting
      }
    })

    function handleSelect() {
      if (props.disabled) return

      emit('select', props.value, props.label || props.value)
    }

    return {
      className,
      handleSelect
    }
  }
})
</script>
