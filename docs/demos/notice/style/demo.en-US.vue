<template>
  <Button
    type="primary"
    @click="Notice.info({ title: 'Notice Title', content: 'A colorful text notice', color: true })"
  >
    Colorful Text
  </Button>
  <Button
    type="success"
    @click="
      Notice.success({
        title: 'Notice Title',
        content: 'A notice with background color',
        background: true
      })
    "
  >
    Background Color
  </Button>
  <Button
    type="warning"
    @click="
      Notice.warning({
        title: 'Notice Title',
        content: 'A notice with background color and colorful text',
        color: true,
        background: true
      })
    "
  >
    Both
  </Button>
  <Button
    type="error"
    @click="
      Notice.error({
        title: 'Notice Title',
        content: 'A notice with custom color',
        color: '#e88d1c'
      })
    "
  >
    Custom Color
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
