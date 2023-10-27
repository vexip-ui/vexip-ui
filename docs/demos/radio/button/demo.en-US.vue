<template>
  <RadioGroup v-model:value="value" shape="button">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Radio label="Other">
      Other
      <Input transparent style="width: 100px; margin-inline-start: 6px"></Input>
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
