<template>
  <Button type="primary" @click="sendMessage">
    Closable
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'

function sendMessage() {
  Message.info({ content: 'A closable message', closable: true })
}
</script>
