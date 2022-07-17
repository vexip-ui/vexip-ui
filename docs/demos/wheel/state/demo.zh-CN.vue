<template>
  <Space>
    <Wheel arrow :options="options"></Wheel>
    <Wheel arrow state="success" :options="options"></Wheel>
    <Wheel arrow state="warning" :options="options"></Wheel>
    <Wheel arrow state="error" :options="options"></Wheel>
  </Space>
</template>

<script setup lang="ts">
const options = Array.from({ length: 20 }, (_, index) => `选项${index + 1}`)
</script>
