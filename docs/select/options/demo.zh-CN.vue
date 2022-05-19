<template>
  <Select v-model:value="value" :options="options"></Select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')

    return {
      value,
      options: [
        '选项1',
        {
          value: '选项2'
        },
        {
          label: '选项3',
          value: 3
        }
      ]
    }
  }
})
</script>
