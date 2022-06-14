<template>
  <Select size="small" placeholder="小小的" :options="options"></Select>
  <br />
  <br />
  <Select placeholder="正常的" :options="options"></Select>
  <br />
  <br />
  <Select size="large" placeholder="大大的" :options="options"></Select>
  <br />
  <br />
  <Select placeholder="再大一点" :options="options" style="--vxp-input-height: 48px;"></Select>
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
