<template>
  <Button type="primary" @click="Message.info('A message')">
    Normal
  </Button>
  <Button
    type="primary"
    @click="Message.info({ content: '10 seconds duration message', duration: 10000 })"
  >
    10s Duration
  </Button>
  <Button
    type="primary"
    @click="Message.info({ content: 'A permanent message', duration: 0, closable: true })"
  >
    Permanent
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
