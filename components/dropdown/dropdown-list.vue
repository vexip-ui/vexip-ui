<template>
  <ul :class="nh.be('list')">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNameHelper } from '@vexip-ui/config'

export default defineComponent({
  name: 'DropdownList',
  setup() {
    return {
      nh: useNameHelper('dropdown')
    }
  }
})
</script>
