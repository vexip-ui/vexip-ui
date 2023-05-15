<template>
  <RadioGroup button :options="items"></RadioGroup>
  <br />
  <br />
  <RadioGroup button>
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
  <RadioGroup button disabled>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
