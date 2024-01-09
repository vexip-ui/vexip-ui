<template>
  <Button type="primary" @click="Message.info({ content: 'A colorful text message', color: true })">
    Colorful Text
  </Button>
  <Button
    type="success"
    @click="Message.success({ content: 'A message with background color', background: true })"
  >
    Background Color
  </Button>
  <Button
    type="warning"
    @click="
      Message.warning({
        content: 'A message with background color and colorful text',
        color: true,
        background: true
      })
    "
  >
    Both
  </Button>
  <Button
    type="error"
    @click="Message.error({ content: 'A message with custom color', color: '#e88d1c' })"
  >
    Custom Color
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
