<template>
  <Select
    filter
    clearable
    :options="options"
    filter-position="in-list"
  ></Select>
  <br />
  <br />
  <Select
    multiple
    clearable
    :filter="filter"
    :options="options"
    filter-position="in-list"
  ></Select>
</template>

<script setup lang="ts">
import type { SelectFilter } from 'vexip-ui'

const options = Array.from({ length: 12 }, (_, i) => ({
  label: `选项${i + 1}`,
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
