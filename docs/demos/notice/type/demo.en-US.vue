<template>
  <Button type="primary" @click="Notice.primary('Notice Title', 'A normal notice')">
    Normal
  </Button>
  <Button type="info" @click="Notice.info('Notice Title', 'A normal notice')">
    Normal
  </Button>
  <Button type="success" @click="Notice.success('Notice Title', 'A success notice')">
    Success
  </Button>
  <Button type="warning" @click="Notice.warning('Notice Title', 'A warning notice')">
    Warning
  </Button>
  <Button type="error" @click="Notice.error('Notice Title', 'A error notice')">
    Error
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
