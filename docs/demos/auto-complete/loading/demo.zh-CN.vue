<template>
  <AutoComplete :loading="loading" placeholder="加载中可编辑" :options="options"></AutoComplete>
  <br />
  <br />
  <AutoComplete
    :loading="loading"
    loading-lock
    placeholder="加载中不可编辑"
    :options="options"
  ></AutoComplete>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['选项1', '选项2', '选项3']
</script>

<style scoped>
.vxp-auto-complete {
  max-width: 400px;
}
</style>
