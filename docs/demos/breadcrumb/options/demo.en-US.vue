<template>
  <Breadcrumb :options="options"></Breadcrumb>
</template>

<script setup lang="ts">
const options = [
  'This Computer',
  {
    label: 'D:',
    name: 'Document (D:)',
  },
  {
    label: 'vexip-ui',
    name: () => 'vexip-ui',
  },
]
</script>
