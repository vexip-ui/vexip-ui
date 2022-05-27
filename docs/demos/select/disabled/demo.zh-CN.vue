<template>
  <Select :options="options"></Select>
  <br />
  <br />
  <Select disabled :options="options"></Select>
</template>

<script setup lang="ts">
const options = ['选项1', '选项2', '选项3']
</script>

<style>
.vxp-select {
  max-width: 400px;
}
</style>
