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
import { computed, defineComponent } from 'vue'

import { emitEvent, useNameHelper } from '@vexip-ui/config'
import { optionProps } from './props'

export default defineComponent({
  name: 'Option',
  props: optionProps,
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
