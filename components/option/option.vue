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
import { useNameHelper } from '@vexip-ui/config'

export default defineComponent({
  name: 'Option',
  props: {
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
  },
  emits: ['select'],
  setup(props, { emit }) {
    const nh = useNameHelper('option')
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('selected')]: !props.disabled && props.selected,
        [nh.bm('divided')]: props.divided,
        [nh.bm('hitting')]: props.hitting
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
