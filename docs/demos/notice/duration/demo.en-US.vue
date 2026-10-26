<template>
  <Button type="primary" @click="Notice.info('A normal notice')">
    Normal
  </Button>
  <Button
    type="primary"
    @click="Notice.info({ content: '10 seconds duration notice', duration: 10000 })"
  >
    10s Duration
  </Button>
  <Button
    type="primary"
    @click="Notice.info({ title: 'A Permanent Notice', duration: 0, closable: true })"
  >
    Permanent Title Only
  </Button>
  <Button
    type="primary"
    @click="
      Notice.info({
        title: 'A Permanent Notice',
        content: 'A notice not disapper until you close it',
        duration: 0,
        closable: true
      })
    "
  >
    Permanent
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
