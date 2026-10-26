<template>
  <Button type="success" @click="DemoNotice.success('Notice Title', 'Some content to notice')">
    Open
  </Button>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'

// Clone a Notice instance to avoid affecting other demos. In actual use, you may not need to do this.
const DemoNotice = Notice.clone()

DemoNotice.config({
  startOffset: 100,
  itemGap: 8,
})
</script>
