<template>
  <DatePicker v-model:value="date" clearable type="datetime"></DatePicker>
  <p>
    Current Date:
    <br />
    {{ date }}
  </p>
  <DatePicker
    v-model:value="dateRange"
    is-range
    clearable
    transfer
    type="datetime"
    :shortcuts="shortcuts"
  ></DatePicker>
  <p>
    Current Date Range:
    <br />
    {{ dateRange }}
  </p>
  <DatePicker
    disabled
    clearable
    type="datetime"
  ></DatePicker>
  <br />
  <br />
  <DatePicker
    disabled
    is-range
    clearable
    type="datetime"
  ></DatePicker>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <DatePicker :state="state"></DatePicker>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '..'

const date = ref<string>('')
const dateRange = ref<string[]>([])

const shortcuts = ref([
  { name: 'Current', value: () => Date.now() },
  { name: 'Noon', value: '2022-05-13 12:00:00' }
])

const states = ['default', 'success', 'error', 'warning'] as const
</script>

<style lang="scss">
.vxp-date-picker {
  width: 380px;
}
</style>
