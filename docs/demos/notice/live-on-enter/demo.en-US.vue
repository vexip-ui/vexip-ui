<template>
  <Button
    type="primary"
    @click="
      Notice.info({
        title: 'Notice Title',
        content: 'Some content to notice',
        closable: true,
        liveOnEnter: true
      })
    "
  >
    Live on Enter
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
