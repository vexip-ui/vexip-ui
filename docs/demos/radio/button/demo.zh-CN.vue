<template>
  <RadioGroup v-model:value="value" shape="button">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
    <Radio label="其他">
      其他
      <Input transparent style="width: 100px; margin-inline-start: 6px"></Input>
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup shape="button">
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
      :disabled="item === '上海'"
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
