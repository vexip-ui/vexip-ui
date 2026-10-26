<template>
  <Tag
    v-for="tagType in states"
    :key="tagType"
    :type="tagType"
    closable
  >
    Tag
  </Tag>
  <br />
  <br />
  <Tag
    v-for="tagType in colors"
    :key="tagType"
    :type="tagType"
    closable
  >
    Tag
  </Tag>
</template>

<script setup lang="ts">
// state type
const states = ['default', 'primary', 'info', 'success', 'error', 'warning'] as const
// color type
const colors = [
  'lime',
  'pink',
  'magenta',
  'tomato',
  'orange',
  'cyan',
  'navy',
  'gold',
  'purple',
] as const
</script>
