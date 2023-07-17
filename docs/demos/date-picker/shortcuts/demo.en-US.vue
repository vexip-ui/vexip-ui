<template>
  <DatePicker type="datetime" :shortcuts="singleShortcuts" style="max-width: 300px"></DatePicker>
  <br />
  <br />
  <DatePicker :shortcuts="multipleShortcuts" range style="max-width: 300px"></DatePicker>
</template>

<script setup lang="ts">
import { addDays } from '@vexip-ui/utils'

const singleShortcuts = [
  { name: 'Today', value: Date.now() },
  { name: 'Yesterday', value: () => new Date(Date.now() - 24 * 60 * 60_000) },
  { name: 'Labor Day', value: () => new Date(new Date().getFullYear(), 4, 1) }
]

const multipleShortcuts = [
  { name: 'Three Days', value: [Date.now(), addDays(Date.now(), 3)] },
  { name: 'One Week', value: () => [Date.now(), addDays(Date.now(), 7)] }
]
</script>
