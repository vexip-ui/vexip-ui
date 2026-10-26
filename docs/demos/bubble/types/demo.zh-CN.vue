<template>
  <Space vertical>
    <Bubble v-for="bubbleType in types" :key="bubbleType" :type="bubbleType">
      气泡的内容
    </Bubble>
  </Space>
</template>

<script setup lang="ts">
const types = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const
</script>
