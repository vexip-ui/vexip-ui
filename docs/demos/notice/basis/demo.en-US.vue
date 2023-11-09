<template>
  <Button type="primary" @click="Notice.open('Notice Title', 'Some content to notice')">
    Open
  </Button>
  <Button type="primary" @click="Notice.open('A Title Only Notice')">
    Title Only
  </Button>
  <Button type="primary" @click="$notice.open({ content: 'A content only notice' })">
    Content Only
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'
</script>
