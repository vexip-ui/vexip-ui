<template>
  <DatePicker v-model:value="date" :shortcuts="shortcuts" style="width: 220px;"></DatePicker>
  <p>
    Current Date: {{ date }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2020-05-30')
const shortcuts = [
  { name: '今天', value: () => Date.now() },
  { name: '昨天', value: () => new Date(Date.now() - 24 * 60 * 60_000) },
  { name: '劳动节', value: () => new Date(new Date().getFullYear(), 4, 1) }
]
</script>
