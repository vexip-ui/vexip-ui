<template>
  <Button type="primary" @click="Message.info('A normal message')">
    Normal
  </Button>
  <Button type="success" @click="Message.success('A success message')">
    Success
  </Button>
  <Button type="warning" @click="Message.warning('A warning message')">
    Warning
  </Button>
  <Button type="error" @click="Message.error('A error message')">
    Error
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
