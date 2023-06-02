<template>
  <li
    :class="{
      [nh.b()]: true,
      [nh.ns('option-vars')]: true,
      [nh.bm('divided')]: divided
    }"
  >
    <div :class="nh.be('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <ul :class="nh.be('list')">
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { optionGroupProps } from './props'

export default defineComponent({
  name: 'OptionGroup',
  props: optionGroupProps,
  setup() {
    return {
      nh: useNameHelper('option-group')
    }
  }
})
</script>
