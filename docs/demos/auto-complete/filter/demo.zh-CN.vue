<template>
  <AutoComplete
    v-model:value="value"
    filter
    ignore-case
    :options="options"
    style="max-width: 400px;"
  ></AutoComplete>
  <p>Current Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  'Alert',
  'AutoComplete',
  'Badge',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'Checkbox',
  'DatePicker',
  'Divider',
  'Drawer',
  'Dropdown',
  'Ellipsis',
  'Icon',
  'Input',
  'Linker',
  'NumberInput',
  'Option',
  'Pagination',
  'Progress',
  'Radio',
  'Row',
  'Scroll',
  'Table',
  'Tabs',
  'Tag',
  'Textarea',
  'Tooltip',
  'Tree',
  'Upload',
  'Wheel'
]
</script>
