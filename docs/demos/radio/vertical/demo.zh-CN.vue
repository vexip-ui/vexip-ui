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

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const items = ['北京', '上海', '广州', '深圳']
</script>
