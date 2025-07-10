<template>
  <Button type="success" @click="DemoMessage.success('一条消息')">
    打开消息
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'

// 克隆一个 Message 实例以防止影响其他示例，实际使用中可能你并不需要这么做
const DemoMessage = Message.clone()

DemoMessage.config({
  startOffset: 100,
  itemGap: 8,
})
</script>
