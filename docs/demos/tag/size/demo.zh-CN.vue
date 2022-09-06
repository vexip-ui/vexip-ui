<template>
  <Tag
    v-for="tagType in tags"
    :key="tagType"
    :type="tagType"
    closable
    size="small"
  >
    标签
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tagType in tags"
    :key="tagType"
    :type="tagType"
    closable
    size="default"
  >
    标签
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tagType in tags"
    :key="tagType"
    :type="tagType"
    closable
    size="large"
  >
    标签
  </Tag>
</template>

<script setup lang="ts">
const tags = ['default', 'info', 'primary', 'success', 'error', 'warning'] as const
</script>
