<script setup lang="ts">
import { useNameHelper } from '@vexip-ui/config'
import { optionGroupProps } from './props'

defineOptions({ name: 'OptionGroup' })

defineProps(optionGroupProps)

const nh = useNameHelper('option-group')
</script>

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
