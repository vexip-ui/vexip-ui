<script setup lang="ts">
import { computed } from 'vue'

import { emitEvent, useNameHelper } from '@vexip-ui/config'
import { toAttrValue } from '@vexip-ui/utils'
import { optionProps } from './props'

defineOptions({ name: 'Option' })

const props = defineProps(optionProps)

const nh = useNameHelper('option')
const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('disabled')]: props.disabled,
    [nh.bm('selected')]: !props.disabled && props.selected,
    [nh.bm('divided')]: props.divided,
    [nh.bm('hitting')]: props.hitting,
    [nh.bm('no-hover')]: props.noHover,
  }
})

function handleSelect() {
  if (props.disabled) return

  emitEvent(props.onSelect!)
}
</script>

<template>
  <li
    ref="wrapper"
    :class="className"
    :title="title || undefined"
    role="option"
    :aria-disabled="toAttrValue(disabled)"
    :aria-selected="selected"
    @click="handleSelect"
  >
    <slot>{{ label || value }}</slot>
  </li>
</template>
