<template>
  <p>加载中可编辑：</p>
  <RadioGroup :loading="loading" :options="options"></RadioGroup>
  <br />
  <br />
  <RadioGroup :loading="loading" shape="button" :options="options"></RadioGroup>
  <br />
  <br />
  <RadioGroup :loading="loading" shape="button-group" :options="options"></RadioGroup>
  <p>加载中不可编辑：</p>
  <RadioGroup :loading="loading" loading-lock :options="options"></RadioGroup>
  <br />
  <br />
  <RadioGroup
    :loading="loading"
    loading-lock
    shape="border"
    :options="options"
  ></RadioGroup>
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
