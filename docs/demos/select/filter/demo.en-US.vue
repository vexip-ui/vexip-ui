<template>
  <Select filter :options="options"></Select>
  <br />
  <br />
  <Select
    multiple
    clearable
    filter
    :options="options"
  ></Select>
</template>

<script setup lang="ts">
const options = Array.from({ length: 12 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1
}))
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
