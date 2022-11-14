<template>
  <Select v-model:label="label" :options="options"></Select>
  <p>
    Current label:
    {{ label }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const label = ref('')

const options = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  }
]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
