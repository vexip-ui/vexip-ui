<template>
  <p>当前值：{{ value }}</p>
  <Select v-model:value="value" :options="options"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()

const options = [
  '选项1',
  {
    value: '选项2'
  },
  {
    label: '选项3',
    value: 3
  },
  {
    label: '选项4',
    value: true
  }
]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
