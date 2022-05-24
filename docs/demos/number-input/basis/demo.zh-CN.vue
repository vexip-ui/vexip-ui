<template>
  <NumberInput v-model:value="value" style="width: 300px;"></NumberInput>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref<number | null>(null)

    return { value }
  }
})
</script>
