<template>
  <Select v-model:value="value" :options="options"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  'Option 1',
  {
    value: 'Option 2'
  },
  {
    label: 'Option 3',
    value: 3
  }
]
</script>

<style>
.vxp-select {
  max-width: 400px;
}
</style>
