<template>
  <AutoComplete
    v-model:value="value"
    filter
    ignore-case
    style="max-width: 400px"
    :options="options"
    clearable
  ></AutoComplete>
  <p>Current Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  'AutoComplete',
  'Checkbox',
  'ColorPicker',
  'DatePicker',
  'Input',
  'Radio',
  'Select',
  'Slider',
  'Switch',
  'TimePicker',
  'Upload',
  'Wheel',
]
</script>
