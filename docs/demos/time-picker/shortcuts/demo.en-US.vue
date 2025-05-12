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
  <TimePicker
    :shortcuts="singleShortcuts"
    :shortcuts-placement="placement"
    clearable
    style="max-width: 300px"
  ></TimePicker>
  <br />
  <br />
  <TimePicker
    range
    :shortcuts="multipleShortcuts"
    :shortcuts-placement="placement"
    clearable
    style="max-width: 300px"
  ></TimePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['top', 'right', 'bottom', 'left'] as const
const placement = ref(options[3])

const singleShortcuts = [
  { name: 'Work', value: '08:00:00' },
  { name: 'Off Work', value: () => '18:00:00' },
]

const multipleShortcuts = [
  { name: 'Morning', value: ['08:00:00', '12:00:00'] },
  { name: 'Afternoon', value: () => ['14:00:00', '18:00:00'] },
]
</script>
