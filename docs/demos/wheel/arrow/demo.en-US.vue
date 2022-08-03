<template>
  <Wheel arrow :options="options"></Wheel>
</template>

<script setup lang="ts">
const options = Array.from({ length: 20 }, (_, index) => `Option ${index + 1}`)
</script>
