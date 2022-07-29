<template>
  <p>加载中可编辑：</p>
  <CheckboxGroup :loading="loading" :options="options"></CheckboxGroup>
  <p>加载中不可编辑：</p>
  <CheckboxGroup :loading="loading" loading-lock :options="options"></CheckboxGroup>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['北京', '上海', '广州', '深圳']
</script>
