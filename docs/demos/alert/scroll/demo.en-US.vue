<template>
  <Alert scroll type="info">
    Time with force, heaven and earth to ship it to the hero is not free.
  </Alert>
  <Alert scroll type="success" :icon="Bullhorn">
    Time with force, heaven and earth to ship it to the hero is not free.
  </Alert>
</template>

<script setup lang="ts">
import { Bullhorn } from '@vexip-ui/icons'
</script>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
