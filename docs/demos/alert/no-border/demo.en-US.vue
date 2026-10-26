<template>
  <Alert
    v-for="alertType in types"
    :key="alertType"
    no-border
    :type="alertType"
  >
    Some content to alert
  </Alert>
</template>

<script setup lang="ts">
const types = ['primary', 'info', 'success', 'warning', 'error'] as const
</script>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
