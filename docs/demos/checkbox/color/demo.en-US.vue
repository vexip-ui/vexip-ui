<template>
  <Space vertical>
    <CheckboxGroup color="orange" :value="['Shanghai']" :options="options"></CheckboxGroup>
    <CheckboxGroup
      color="orange"
      state-color
      :value="['Shanghai']"
      :options="options"
    ></CheckboxGroup>
  </Space>
</template>

<script setup lang="ts">
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
