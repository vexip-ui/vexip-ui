<template>
  <Button
    type="primary"
    @click="Message.info({ content: 'A message', closable: true, liveOnEnter: true })"
  >
    Live on Enter
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
