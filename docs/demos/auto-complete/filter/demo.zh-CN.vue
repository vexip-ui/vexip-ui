<template>
  <AutoComplete
    v-model:value="value"
    filter
    ignore-case
    style="width: 400px;"
    :options="options"
  ></AutoComplete>
  <p>
    Current Value: {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  'Alert',
  'Anchor',
  'AutoComplete',
  'Badge',
  'Breadcrumb',
  'Bubble',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'Checkbox',
  'Collapse',
  'ColorPicker',
  'DatePicker',
  'Divider',
  'Drawer',
  'Dropdown',
  'Ellipsis',
  'Form',
  'Grid',
  'Highlight',
  'Icon',
  'Input',
  'Linker',
  'Masker',
  'Menu',
  'Modal',
  'NativeScroll',
  'NumberInput',
  'Option',
  'Pagination',
  'Progress',
  'Radio',
  'ResizeObserver',
  'Row',
  'Scroll',
  'Scrollbar',
  'Select',
  'Slider',
  'Spin',
  'Split',
  'Switcher',
  'TabNav',
  'Table',
  'Tabs',
  'Tag',
  'Textarea',
  'TimeAgo',
  'TimePicker',
  'Timeline',
  'Tooltip',
  'Tree',
  'Upload',
  'Wheel',
  'Confirm',
  'Contextmenu',
  'Loading',
  'Message',
  'Notice'
]
</script>
