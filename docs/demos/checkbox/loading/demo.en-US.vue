<template>
  <p>Loading and editable</p>
  <CheckboxGroup :loading="loading" :options="options"></CheckboxGroup>
  <p>Loading and readonly</p>
  <CheckboxGroup :loading="loading" loading-lock :options="options"></CheckboxGroup>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
