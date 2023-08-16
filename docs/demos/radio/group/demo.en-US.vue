<template>
  <RadioGroup v-model:value="value">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Radio label="Else">
      Else
      <Input style="margin-inline-start: 6px"></Input>
    </Radio>
  </RadioGroup>
  <p style="margin-top: 10px">
    value: {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
