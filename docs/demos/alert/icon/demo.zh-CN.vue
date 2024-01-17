<template>
  <Alert
    v-for="alertType in types"
    :key="alertType"
    icon
    :type="alertType"
  >
    警告提示的内容
  </Alert>
  <Alert
    v-for="alertType in types"
    :key="alertType"
    icon
    :type="alertType"
    title="警告标题"
  >
    警告提示的内容
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
