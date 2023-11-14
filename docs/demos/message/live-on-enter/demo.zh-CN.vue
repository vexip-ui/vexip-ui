<template>
  <Button
    type="primary"
    @click="Message.info({ content: '一条消息', closable: true, liveOnEnter: true })"
  >
    移入后不消失
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
