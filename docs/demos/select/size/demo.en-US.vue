<template>
  <Select size="small" placeholder="Small size" :options="options"></Select>
  <br />
  <br />
  <Select placeholder="Default size" :options="options"></Select>
  <br />
  <br />
  <Select size="large" placeholder="Large size" :options="options"></Select>
  <br />
  <br />
  <Select placeholder="Custom size" :options="options" style="--vxp-input-height: 48px;"></Select>
</template>

<script setup lang="ts">
const options = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  }
]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
