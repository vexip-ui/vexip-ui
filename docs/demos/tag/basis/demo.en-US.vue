<template>
  <Tag v-for="tagType in tags" :key="tagType" :type="tagType">
    Tag
  </Tag>
</template>

<script setup lang="ts">
const tags = ['default', 'info', 'primary', 'success', 'error', 'warning'] as const
</script>
