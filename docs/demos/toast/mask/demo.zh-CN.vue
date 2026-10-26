<template>
  <Button type="primary" @click="showToast1">
    包含遮罩
  </Button>
  <Button type="primary" @click="showToast2">
    点击遮罩关闭
  </Button>
</template>

<script setup lang="ts">
import { Toast } from 'vexip-ui'

function showToast1() {
  Toast.error({
    content: '包含遮罩',
    closable: true,
    showMask: true,
  })
}

function showToast2() {
  Toast.warning({
    content: '点击外部关闭',
    showMask: true,
    maskClose: true,
    duration: 5000,
  })
}
</script>
