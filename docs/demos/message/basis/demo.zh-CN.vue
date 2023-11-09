<template>
  <Button type="primary" @click="Message.open('一条消息')">
    打开消息
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
