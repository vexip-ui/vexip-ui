<template>
  <Select :loading="loading" placeholder="加载中可编辑" :options="options"></Select>
  <br />
  <br />
  <Select
    :loading="loading"
    loading-lock
    placeholder="加载中不可编辑"
    :options="options"
  ></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['选项1', '选项2', '选项3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
