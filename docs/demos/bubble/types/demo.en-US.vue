<template>
  <Space vertical>
    <Bubble v-for="bubbleType in types" :key="bubbleType" :type="bubbleType">
      Bubble content
    </Bubble>
  </Space>
</template>

<script setup lang="ts">
const types = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const
</script>
