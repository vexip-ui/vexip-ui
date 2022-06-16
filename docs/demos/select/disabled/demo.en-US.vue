<template>
  <Select :options="options"></Select>
  <br />
  <br />
  <Select disabled :options="options"></Select>
</template>

<script setup lang="ts">
const options = ['Option 1', 'Option 2', 'Option 3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
