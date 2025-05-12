<template>
  <Breadcrumb :options="options"></Breadcrumb>
</template>

<script setup lang="ts">
const options = [
  '此电脑',
  {
    label: 'D:',
    name: '文档 (D:)',
  },
  {
    label: 'vexip-ui',
    name: () => 'vexip-ui',
  },
]
</script>
