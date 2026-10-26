<template>
  <Button
    type="primary"
    @click="Notice.info({ title: '提醒的标题', content: '一条字体有颜色的提示消息', color: true })"
  >
    字体颜色
  </Button>
  <Button
    type="success"
    @click="
      Notice.success({
        title: '提醒的标题',
        content: '一条背景有颜色的提示消息',
        background: true
      })
    "
  >
    背景颜色
  </Button>
  <Button
    type="warning"
    @click="
      Notice.warning({
        title: '提醒的标题',
        content: '一条字体和背景有颜色的提示消息',
        color: true,
        background: true
      })
    "
  >
    字体和背景颜色
  </Button>
  <Button
    type="error"
    @click="
      Notice.error({
        title: '提醒的标题',
        content: '一条自定义颜色的提示消息',
        color: '#e88d1c'
      })
    "
  >
    自定义颜色
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
