<template>
  <li
    ref="wrapper"
    :class="className"
    :title="noTitle ? undefined : String(value)"
    role="option"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-selected="selected"
    @click="handleSelect"
  >
    <slot>{{ label || value }}</slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNameHelper, eventProp, emitEvent } from '@vexip-ui/config'

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
    noHover: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    onSelect: eventProp()
  },
  emits: [],
  setup(props) {
    const nh = useNameHelper('option')
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('selected')]: !props.disabled && props.selected,
        [nh.bm('divided')]: props.divided,
        [nh.bm('hitting')]: props.hitting,
        [nh.bm('no-hover')]: props.noHover
      }
    })

    function handleSelect() {
      if (props.disabled) return

      emitEvent(props.onSelect!)
    }

    return {
      className,
      handleSelect
    }
  }
})
</script>
