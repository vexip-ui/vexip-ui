<template>
  <AutoComplete
    v-model:value="value"
    style="width: 400px;"
    :options="options"
  ></AutoComplete>
  <p>
    Current value:
    {{ value }}
  </p>
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
  'Wheel'
]
</script>
