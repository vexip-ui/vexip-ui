<template>
  <Space vertical>
    <RadioGroup
      v-for="state in states"
      :key="state"
      value="Shanghai"
      :state="state"
      :options="options"
    ></RadioGroup>
  </Space>
</template>

<script setup lang="ts">
const states = ['default', 'success', 'error', 'warning'] as const
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
