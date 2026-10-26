<template>
  <RadioGroup shape="button-group" :options="items"></RadioGroup>
  <br />
  <br />
  <RadioGroup shape="button-group">
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
      :disabled="item === 'Shanghai'"
    >
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup shape="button-group" disabled>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
