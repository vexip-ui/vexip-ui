<template>
  <Button type="primary" @click="sendMessage">
    可关闭消息
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'

function sendMessage() {
  Message.info({ content: '一条可关闭的消息', closable: true })
}
</script>
