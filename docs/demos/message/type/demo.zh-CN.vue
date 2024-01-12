<template>
  <Button type="primary" @click="Message.primary('一条一般消息')">
    一般消息
  </Button>
  <Button type="info" @click="Message.info('一条一般消息')">
    一般消息
  </Button>
  <Button type="success" @click="Message.success('一条成功消息')">
    成功消息
  </Button>
  <Button type="warning" @click="Message.warning('一条警告消息')">
    警告消息
  </Button>
  <Button type="error" @click="Message.error('一条错误消息')">
    错误消息
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
