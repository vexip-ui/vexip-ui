<template>
  <Select transparent :options="options"></Select>
</template>

<script setup lang="ts">
const options = [
  {
    label: '选项1',
    value: 1
  },
  {
    label: '选项2',
    value: 2
  },
  {
    label: '选项3',
    value: 3
  }
]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
