<template>
  <Select v-model:value="value">
    <Option
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      :label="item.label"
    >
      {{ `${index + 1}、${item.label}` }}
    </Option>
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

<style>
.vxp-select {
  max-width: 400px;
}
</style>
