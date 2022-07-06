<template>
  <RadioGroup v-model:value="value" border>
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
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
