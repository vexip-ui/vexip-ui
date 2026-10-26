<template>
  <Button type="primary" @click="Notice.primary('提示的标题', '一条一般提示消息')">
    一般提示
  </Button>
  <Button type="info" @click="Notice.info('提示的标题', '一条一般提示消息')">
    一般提示
  </Button>
  <Button type="success" @click="Notice.success('提示的标题', '一条成功提示消息')">
    成功提示
  </Button>
  <Button type="warning" @click="Notice.warning('提示的标题', '一条警告提示消息')">
    警告提示
  </Button>
  <Button type="error" @click="Notice.error('提示的标题', '一条错误提示消息')">
    错误提示
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
