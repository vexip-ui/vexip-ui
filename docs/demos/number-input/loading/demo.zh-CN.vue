<template>
  <NumberInput :loading="loading" placeholder="加载中可编辑"></NumberInput>
  <br />
  <br />
  <NumberInput :loading="loading" loading-lock placeholder="加载中不可编辑"></NumberInput>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>
.vxp-number-input {
  max-width: 300px;
}
</style>
