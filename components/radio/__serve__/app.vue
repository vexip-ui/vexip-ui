<template>
  <RadioGroup v-model:value="value">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <p style="margin-top: 10px;">
    value: {{ value }}
  </p>
  <template v-for="state in states" :key="state">
    <RadioGroup :value="items[0]">
      <Radio
        v-for="(item, index) in items"
        :key="item"
        :state="state"
        :label="item"
        :disabled="index === 2 || index === 3"
      ></Radio>
    </RadioGroup>
    <br />
  </template>
  <br />
  <template v-for="state in states" :key="state">
    <RadioGroup :value="items[3]">
      <Radio
        v-for="(item, index) in items"
        :key="item"
        :state="state"
        :label="item"
        :disabled="index === 2 || index === 3"
      ></Radio>
    </RadioGroup>
    <br />
  </template>
  <br />
  <template v-for="state in states" :key="state">
    <RadioGroup :value="items[0]">
      <Radio
        v-for="(item, index) in items"
        :key="item"
        border
        :state="state"
        :label="item"
        :disabled="index === 2 || index === 3"
      ></Radio>
    </RadioGroup>
    <br />
    <br />
  </template>
  <br />
  <template v-for="size in sizes" :key="size">
    <RadioGroup :value="items[0]">
      <Radio
        v-for="(item, index) in items"
        :key="item"
        :label="item"
        :size="size"
        :disabled="index === 2 || index === 3"
      ></Radio>
    </RadioGroup>
    <br />
  </template>
  <br />
  <template v-for="size in sizes" :key="size">
    <RadioGroup :value="items[0]">
      <Radio
        v-for="(item, index) in items"
        :key="item"
        border
        :label="item"
        :size="size"
        :disabled="index === 2 || index === 3"
      ></Radio>
    </RadioGroup>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Radio from '../radio.vue'
import RadioGroup from '../radio-group.vue'

const value = ref('上海')
const items = ['北京', '上海', '广州', '深圳']

const states = ['default', 'success', 'error', 'warning'] as const
const sizes = ['small', 'default', 'large'] as const
</script>
