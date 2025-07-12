<template>
  <Button type="success" @click="DemoMessage.success('A message')">
    Open
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'

// Clone a Message instance to avoid affecting other demos. In actual use, you may not need to do this.
const DemoMessage = Message.clone()

DemoMessage.config({
  startOffset: 100,
  itemGap: 8,
})
</script>
