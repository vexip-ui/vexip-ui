<template>
  <DatePicker type="datetime" :shortcuts="singleShortcuts" style="max-width: 300px"></DatePicker>
  <br />
  <br />
  <DatePicker :shortcuts="multipleShortcuts" range style="max-width: 300px"></DatePicker>
</template>

<script setup lang="ts">
import { addDays } from '@vexip-ui/utils'

const singleShortcuts = [
  { name: '今天', value: Date.now() },
  { name: '昨天', value: () => new Date(Date.now() - 24 * 60 * 60_000) },
  { name: '劳动节', value: () => new Date(new Date().getFullYear(), 4, 1) }
]

const multipleShortcuts = [
  { name: '三天后', value: [Date.now(), addDays(Date.now(), 3)] },
  { name: '一周', value: () => [Date.now(), addDays(Date.now(), 7)] }
]
</script>
