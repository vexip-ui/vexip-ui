<template>
  <Select filter creatable :options="options"></Select>
  <br />
  <br />
  <Select
    multiple
    clearable
    filter
    creatable
    :options="options"
  ></Select>
</template>

<script setup lang="ts">
const options = Array.from({ length: 12 }, (_, i) => ({
  label: `选项${i + 1}`,
  value: i + 1
}))
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
