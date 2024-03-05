<template>
  <RadioGroup v-model:value="value">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Radio label="其他">
      其他
      <template #extra>
        <Input style="margin-inline-start: 6px"></Input>
      </template>
    </Radio>
  </RadioGroup>
  <p style="margin-top: 10px">
    value: {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const items = ['北京', '上海', '广州', '深圳']
</script>
