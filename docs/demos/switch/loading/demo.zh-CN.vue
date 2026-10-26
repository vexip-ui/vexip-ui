<template>
  <Switch loading></Switch>
  <br />
  <br />
  异步操作：<Switch :loading="loading" :on-before-change="asyncAction"></Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Message } from 'vexip-ui'

const loading = ref(false)

function asyncAction(checked: boolean) {
  loading.value = true

  return new Promise<void>(resolve => {
    setTimeout(() => {
      Message.info(checked ? '打开开关' : '关闭开关')
      loading.value = false
      resolve()
    }, 2000)
  })
}
</script>
