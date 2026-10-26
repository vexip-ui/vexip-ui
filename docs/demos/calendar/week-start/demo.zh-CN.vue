<template>
  <Calendar :week-start="weekStart">
    <template #title>
      每周开始于：
      <Select v-model:value="weekStart" :options="options" style="max-width: 200px"></Select>
    </template>
  </Calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { WeekIndex } from 'vexip-ui'

const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const options = Array.from({ length: 7 }, (_, index) => ({
  label: weeks[index],
  value: index as WeekIndex,
}))
const weekStart = ref<WeekIndex>(0)
</script>
