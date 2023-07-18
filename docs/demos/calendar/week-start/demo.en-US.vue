<template>
  <Calendar :week-start="weekStart">
    <template #title>
      Week start at:
      <Select v-model:value="weekStart" :options="options" style="max-width: 200px"></Select>
    </template>
  </Calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { WeekIndex } from 'vexip-ui'

const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const options = Array.from({ length: 7 }, (_, index) => ({
  label: weeks[index],
  value: index as WeekIndex
}))
const weekStart = ref<WeekIndex>(0)
</script>
