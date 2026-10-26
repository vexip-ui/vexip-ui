<template>
  <Button
    type="primary"
    @click="
      Notice.info({
        title: '提示的标题',
        content: '一条提示消息',
        closable: true,
        liveOnEnter: true
      })
    "
  >
    移入后不消失
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
