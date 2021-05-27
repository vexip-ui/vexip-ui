<template>
  <ul :class="`${prefix}__list`">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownList',
  setup() {
    return {
      prefix: 'vxp-dropdown'
    }
  }
})
</script>
