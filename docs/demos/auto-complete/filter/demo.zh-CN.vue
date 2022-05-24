<template>
  <AutoComplete
    v-model:value="value"
    filter
    ignore-case
    style="width: 200px;"
    :options="options"
  ></AutoComplete>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')

    return {
      value,
      options: [
        'AutoComplete',
        'Checkbox',
        'ColorPicker',
        'DatePicker',
        'Input',
        'Radio',
        'Select',
        'Slider',
        'Switcher',
        'TimePicker',
        'Upload',
        'Wheel'
      ]
    }
  }
})
</script>
