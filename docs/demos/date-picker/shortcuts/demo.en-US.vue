<template>
  <p>
    Shortcuts Placement:
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
  { name: 'Today', value: Date.now() },
  { name: 'Yesterday', value: () => new Date(Date.now() - 24 * 60 * 60_000) },
  { name: 'Labor Day', value: () => new Date(new Date().getFullYear(), 4, 1) },
  ...Array.from({ length: 9 }).map((_, i) => ({
    name: `${i + 1} Week(s) Later`,
    value: addWeeks(Date.now(), i + 1)
  }))
]

const multipleShortcuts = [
  { name: 'Three Days', value: [Date.now(), addDays(Date.now(), 3)] },
  { name: 'One Week', value: () => [Date.now(), addDays(Date.now(), 7)] }
]
</script>
