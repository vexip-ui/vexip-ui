<template>
  <Tag
    v-for="tagType in tags"
    :key="tagType"
    :type="tagType"
    closable
    size="small"
  >
    Tag
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
    Tag
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
    Tag
  </Tag>
</template>

<script setup lang="ts">
const tags = ['default', 'info', 'primary', 'success', 'error', 'warning'] as const
</script>
