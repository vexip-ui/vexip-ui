<template>
  <Space vertical>
    <CheckboxGroup
      v-for="state in states"
      :key="state"
      :value="['Shanghai']"
      :state="state"
      :options="options"
    ></CheckboxGroup>
  </Space>
</template>

<script setup lang="ts">
const states = ['default', 'success', 'error', 'warning'] as const
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
