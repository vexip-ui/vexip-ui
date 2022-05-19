<template>
  <div>
    <Select
      v-model:value="values"
      multiple
      clearable
      option-check
      :options="options"
    ></Select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const values = ref<number[]>([])
    const options = Array.from({ length: 12 }, (_, i) => ({
      label: `选项${i + 1}`,
      value: i + 1
    }))

    return { values, options }
  }
})
</script>
