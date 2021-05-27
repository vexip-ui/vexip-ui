<template>
  <teleport v-if="to" :to="to">
    <slot></slot>
  </teleport>
  <slot v-else></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Portal',
  functional: true,
  props: {
    to: {
      type: String,
      default: ''
    }
  }
})
</script>
