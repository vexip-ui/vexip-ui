<template>
  <Button type="primary" @click="showToast">
    Closable
  </Button>
</template>

<script setup lang="ts">
import { Toast } from 'vexip-ui'

function showToast() {
  Toast.error({
    content: 'Click to close',
    closable: true,
  })
}
</script>
