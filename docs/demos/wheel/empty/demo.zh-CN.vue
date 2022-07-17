<template>
  <Space>
    <Wheel insert-empty :options="options"></Wheel>
    <Wheel insert-empty="未选择" :options="options"></Wheel>
  </Space>
</template>

<script setup lang="ts">
const options = Array.from({ length: 20 }, (_, index) => `选项${index + 1}`)
</script>
