<script setup lang="ts">
import { useNameHelper } from '@vexip-ui/config'

defineOptions({ name: 'DropdownList' })

const nh = useNameHelper('dropdown')
</script>

<template>
  <ul :class="nh.be('list')" role="menu">
    <slot></slot>
  </ul>
</template>
