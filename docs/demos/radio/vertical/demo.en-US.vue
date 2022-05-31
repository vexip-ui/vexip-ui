<template>
  <RadioGroup v-model:value="value" vertical>
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
    >
      {{ item }}
    </Radio>
  </RadioGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')

    return {
      value,
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>
