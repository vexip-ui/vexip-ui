<template>
  <Alert scroll type="info">
    要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度。
  </Alert>
  <Alert scroll type="success" :icon="Bullhorn">
    要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度。
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
