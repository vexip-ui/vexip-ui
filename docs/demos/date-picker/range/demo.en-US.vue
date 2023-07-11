<template>
  <DatePicker
    v-model:value="yearRange"
    range
    type="year"
    clearable
    style="max-width: 300px"
  ></DatePicker>
  <p>Current Year Range: {{ yearRange }}</p>
  <DatePicker
    v-model:value="dateRange"
    range
    clearable
    style="max-width: 300px"
  ></DatePicker>
  <p>Current Date Range: {{ dateRange }}</p>
  <DatePicker
    v-model:value="datetimeRange"
    range
    type="datetime"
    clearable
    style="max-width: 380px"
  ></DatePicker>
  <p>Current Datetime Range: {{ datetimeRange }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const yearRange = ref<number[]>([])
const dateRange = ref<string[]>([])
const datetimeRange = ref<string[]>([])
</script>
