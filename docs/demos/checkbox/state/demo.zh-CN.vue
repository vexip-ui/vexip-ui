<template>
  <Space vertical>
    <CheckboxGroup
      v-for="state in states"
      :key="state"
      :value="['上海']"
      :state="state"
      :options="options"
    ></CheckboxGroup>
  </Space>
</template>

<script setup lang="ts">
const states = ['default', 'success', 'error', 'warning'] as const
const options = ['北京', '上海', '广州', '深圳']
</script>
