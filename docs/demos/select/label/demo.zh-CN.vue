<template>
  <Select v-model:value="value" :options="options">
    <template #default="{ option, index }">
      {{ `${index + 1}、${option.label}` }}
    </template>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

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
