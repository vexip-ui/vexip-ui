<template>
  <div>
    <Radio v-model:value="value" label="radio">
      Radio
    </Radio>
    <br />
    <p style="margin: 10px 0;">
      value: {{ value }}
    </p>
    <Button
      type="primary"
      size="small"
      @click="value = value ? '' : 'radio'"
    >
      {{ value ? 'Cancel' : 'Select' }}
    </Button>
  </div>
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
