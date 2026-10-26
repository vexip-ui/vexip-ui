<template>
  <p>Current value: {{ value }}</p>
  <Select v-model:value="value" :options="options"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()

const options = [
  'Option 1',
  {
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 3,
  },
  {
    label: 'Option 4',
    value: true,
  },
]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
