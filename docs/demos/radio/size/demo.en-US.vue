<template>
  <RadioGroup size="small">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup size="large">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup button size="small">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup button>
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup button size="large">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
