<template>
  <Textarea :loading="loading" :max-length="10" placeholder="加载中可编辑"></Textarea>
  <br />
  <br />
  <Textarea :loading="loading" loading-lock placeholder="加载中不可编辑"></Textarea>
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
.vxp-textarea {
  max-width: 300px;
}
</style>
