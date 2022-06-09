<template>
  <Select v-model:value="value" :options="options" :max-list-height="200"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options: string[] = []

for (let i = 1; i < 1600; ++i) {
  options.push(`选项${i}`)
}
</script>

<style>
.vxp-select {
  max-width: 400px;
}
</style>
