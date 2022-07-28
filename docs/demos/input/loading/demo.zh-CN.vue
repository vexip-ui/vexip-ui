<template>
  <Input :loading="loading" placeholder="加载中可编辑"></Input>
  <br />
  <br />
  <Input :loading="loading" loading-lock placeholder="加载中不可编辑"></Input>
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
.vxp-input-wrapper {
  max-width: 300px;
}
</style>
