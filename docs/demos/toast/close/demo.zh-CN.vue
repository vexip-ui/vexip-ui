<template>
  <Button type="primary" @click="showToast">
    可关闭提示
  </Button>
</template>

<script setup lang="ts">
import { Toast } from 'vexip-ui'

function showToast() {
  Toast.error({
    content: '点击关闭',
    closable: true,
  })
}
</script>
