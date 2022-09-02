<template>
  <Select v-model:label="label" :options="options"></Select>
  <p>
    当前标签：
    {{ label }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const label = ref('')

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
