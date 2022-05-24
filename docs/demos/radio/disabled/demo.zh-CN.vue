<template>
  <RadioGroup v-model:value="value">
    <Radio label="enabled">
      Enabled
    </Radio>
    <Radio disabled label="disabled">
      Disabled
    </Radio>
  </RadioGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')

    return { value }
  }
})
</script>
