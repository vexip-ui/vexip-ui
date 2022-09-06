<template>
  <div>
    <Button type="primary" @click="sendNotice">
      Closable
    </Button>
    <Button type="warning" @click="Notice.warning({ title: 'Notice Title', closable: true })">
      Closable Title Only
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'

function sendNotice() {
  Notice.info({
    title: 'Notice Title',
    content: 'A closable notice',
    closable: true
  })
}
</script>
