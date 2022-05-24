<template>
  <div>
    <RadioGroup v-model:value="value">
      <Radio
        v-for="item in items"
        :key="item"
        :label="item"
      >
        {{ item }}
      </Radio>
    </RadioGroup>
    <p style="margin-top: 10px;">
      value: {{ value }}
    </p>
  </div>
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
