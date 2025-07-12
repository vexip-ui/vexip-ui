<template>
  <Button type="success" @click="DemoNotice.success('提示的标题', '提示消息的具体内容')">
    打开提示
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'

// 克隆一个 Notice 实例以防止影响其他示例，实际使用中可能你并不需要这么做
const DemoNotice = Notice.clone()

DemoNotice.config({
  startOffset: 100,
  itemGap: 8,
})
</script>
