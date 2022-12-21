<template>
  <Space vertical>
    <NumberInput></NumberInput>
    <NumberInput control-type="left"></NumberInput>
    <NumberInput control-type="right-fade"></NumberInput>
    <NumberInput control-type="left-fade"></NumberInput>
    <NumberInput control-type="none"></NumberInput>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()
</script>

<style scoped>
.vxp-number-input {
  max-width: 300px;
}
</style>
