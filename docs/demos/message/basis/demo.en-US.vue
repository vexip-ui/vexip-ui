<template>
  <Button type="primary" @click="Message.open('A message')">
    Open
  </Button>
</template>

<script setup lang="ts">
import { Message } from 'vexip-ui'
</script>
