<template>
  <Select v-model:value="value" :options="options" clearable></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()

const options = Array.from({ length: 3 }, (_, index) => ({
  label: `Group ${index + 1}`,
  group: true,
  children: [
    `Option ${index + 1}-1`,
    { value: `Option ${index + 1}-2`, disabled: true },
    `Option ${index + 1}-3`,
    `Option ${index + 1}-4`
  ]
}))
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
