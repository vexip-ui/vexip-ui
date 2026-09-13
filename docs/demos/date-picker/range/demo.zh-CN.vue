<template>
  <DatePicker
    v-model:value="yearRange"
    range
    type="year"
    clearable
    style="max-width: 300px"
  ></DatePicker>
  <p>当前年范围: {{ yearRange }}</p>
  <DatePicker
    v-model:value="weekRange"
    range
    type="week"
    clearable
    style="max-width: 300px"
  ></DatePicker>
  <p>当前周范围: {{ weekRange }}</p>
  <DatePicker
    v-model:value="dateRange"
    range
    clearable
    style="max-width: 300px"
  ></DatePicker>
  <p>当前日期范围: {{ dateRange }}</p>
  <DatePicker
    v-model:value="datetimeRange"
    range
    type="datetime"
    clearable
    style="max-width: 342px"
  ></DatePicker>
  <p>当前日期时间范围: {{ datetimeRange }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const yearRange = ref<number[]>([])
const weekRange = ref<number[]>([])
const dateRange = ref<string[]>([])
const datetimeRange = ref<string[]>([])
</script>
