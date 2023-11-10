<template>
  <Button type="primary" @click="sendNotice">
    可关闭提示
  </Button>
  <Button type="warning" @click="Notice.warning({ title: '提示的标题', closable: true })">
    可关闭的仅标题提示
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'

function sendNotice() {
  Notice.info({
    title: '提示的标题',
    content: '一条可关闭的提示消息',
    closable: true
  })
}
</script>
