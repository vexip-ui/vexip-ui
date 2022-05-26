<template>
  <div>
    <Select
      v-model:value="values"
      multiple
      clearable
      option-check
      :options="options"
    ></Select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<number[]>([])
const options = Array.from({ length: 12 }, (_, i) => ({
  label: `选项${i + 1}`,
  value: i + 1
}))
</script>

<style>
.vxp-select {
  max-width: 400px;
}
</style>
