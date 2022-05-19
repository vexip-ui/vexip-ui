<template>
  <Select v-model:value="value" :options="options" :max-list-height="200"></Select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const options = []

    for (let i = 1; i < 16; i++) {
      options.push(`选项${i}`)
    }

    return { options, value }
  }
})
</script>
