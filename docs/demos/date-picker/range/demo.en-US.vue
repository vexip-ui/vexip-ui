
<template>
  <DatePicker
    v-model:value="yearRange"
    is-range
    type="year"
    style="max-width: 300px;"
  ></DatePicker>
  <p>
    Current Year Range: {{ yearRange }}
  </p>
  <DatePicker
    v-model:value="dateRange"
    is-range
    type="datetime"
    style="width: 380px;"
  ></DatePicker>
  <p>
    Current Date Range: {{ dateRange }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const yearRange = ref<number[]>([])
const dateRange = ref<string[]>([])
</script>
