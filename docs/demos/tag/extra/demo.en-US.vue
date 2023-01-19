<template>
  <Tag
    v-for="(tagType, index) in tags"
    :key="tagType"
    :type="tagType"
    :prefix="index"
    closable
  >
    Tag
  </Tag>
  <br />
  <br />
  <Tag
    v-for="(tagType, index) in tags"
    :key="tagType"
    :type="tagType"
    :suffix="index"
    simple
    closable
  >
    Tag
  </Tag>
  <br />
  <br />
  <Tag color="orange" prefix="version" prefix-bg="#686868">
    v6.6.6
  </Tag>
  <Tag color="limegreen" prefix="node@latest" prefix-bg="#686868">
    >=16.0.0
  </Tag>
</template>

<script setup lang="ts">
const tags = ['default', 'info', 'primary', 'success', 'error', 'warning'] as const
</script>
