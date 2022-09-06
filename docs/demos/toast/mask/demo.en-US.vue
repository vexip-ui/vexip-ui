<template>
  <Button type="primary" @click="showToast1">
    With Mask
  </Button>
  <Button type="primary" @click="showToast2">
    Click Mask To Close
  </Button>
</template>

<script setup lang="ts">
import { Toast } from 'vexip-ui'

function showToast1() {
  Toast.error({
    content: 'With Mask',
    closable: true,
    showMask: true
  })
}

function showToast2() {
  Toast.warning({
    content: 'Click Outside to Close',
    showMask: true,
    maskClose: true,
    duration: 5000
  })
}
</script>
