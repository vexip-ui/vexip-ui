<template>
  <DatePicker v-model:value="date" :shortcuts="shortcuts" style="max-width: 300px;"></DatePicker>
  <p>
    Current Date: {{ date }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2020-05-30')
const shortcuts = [
  { name: 'Today', value: () => Date.now() },
  { name: 'Yesterday', value: () => new Date(Date.now() - 24 * 60 * 60_000) },
  { name: 'Labor Day', value: () => new Date(new Date().getFullYear(), 4, 1) }
]
</script>
