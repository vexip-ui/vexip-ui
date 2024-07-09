<template>
  <Wheel arrow selectable :options="options"></Wheel>
</template>

<script setup lang="ts">
const disabled = [2, 5, 11, 12, 19]
const options = Array.from({ length: 20 }, (_, index) => {
  return {
    value: `Option ${index + 1}`,
    disabled: disabled.includes(index)
  }
})
</script>
