<script setup lang="ts">
defineOptions({ name: 'Portal' })

defineProps({
  to: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <Teleport :to="to || 'body'" :disabled="!to">
    <slot></slot>
  </Teleport>
</template>
