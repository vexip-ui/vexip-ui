<template>
  <Select filter :options="options"></Select>
  <br />
  <br />
  <Select
    multiple
    clearable
    :filter="filter"
    :options="options"
  ></Select>
</template>

<script setup lang="ts">
import type { SelectFilter } from 'vexip-ui'

const options = Array.from({ length: 12 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1,
}))

const filter: SelectFilter = (filterValue, option) => {
  return option.label.toLocaleLowerCase().includes(filterValue.toLocaleUpperCase())
}
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
