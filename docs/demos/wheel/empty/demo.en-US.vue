<template>
  <Space>
    <Wheel insert-empty :options="options"></Wheel>
    <Wheel insert-empty="Empty" :options="options"></Wheel>
  </Space>
</template>

<script setup lang="ts">
const options = Array.from({ length: 20 }, (_, index) => `Option ${index + 1}`)
</script>
