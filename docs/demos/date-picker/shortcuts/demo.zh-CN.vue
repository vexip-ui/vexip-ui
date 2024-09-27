<template>
  <p>
    快捷方式位置：
    <RadioGroup
      v-model:value="placement"
      :options="options"
      button
      style="margin-bottom: 10px"
    ></RadioGroup>
  </p>
  <DatePicker
    type="datetime"
    :shortcuts="singleShortcuts"
    :shortcuts-placement="placement"
    style="max-width: 300px"
  ></DatePicker>
  <br />
  <br />
  <DatePicker
    :shortcuts="multipleShortcuts"
    :shortcuts-placement="placement"
    range
    style="max-width: 300px"
  ></DatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { addDays, addWeeks } from '@vexip-ui/utils'

const options = ['top', 'right', 'bottom', 'left'] as const
const placement = ref(options[3])

const singleShortcuts = [
  { name: '今天', value: Date.now() },
  { name: '昨天', value: () => new Date(Date.now() - 24 * 60 * 60_000) },
  { name: '劳动节', value: () => new Date(new Date().getFullYear(), 4, 1) },
  ...Array.from({ length: 9 }).map((_, i) => ({
    name: `${i + 1}周后`,
    value: addWeeks(Date.now(), i + 1)
  }))
]

const multipleShortcuts = [
  { name: '三天后', value: [Date.now(), addDays(Date.now(), 3)] },
  { name: '一周', value: () => [Date.now(), addDays(Date.now(), 7)] }
]
</script>
