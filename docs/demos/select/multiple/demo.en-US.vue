<template>
  <Select
    v-model:value="values"
    multiple
    clearable
    option-check
    :options="options"
  ></Select>
  <p>Current values: {{ values }}</p>
  <Select
    multiple
    clearable
    option-check
    :max-tag-count="3"
    :options="options"
  ></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<number[]>([])
const options = Array.from({ length: 12 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1
}))
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
