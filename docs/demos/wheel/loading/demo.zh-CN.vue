<template>
  <Space>
    <span>
      <p>加载中可编辑：</p>
      <Wheel value="选项2" :loading="loading" :options="options"></Wheel>
    </span>
    <span>
      <p>加载中不可编辑：</p>
      <Wheel
        value="选项4"
        :loading="loading"
        loading-lock
        :options="options"
      ></Wheel>
    </span>
  </Space>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = Array.from({ length: 20 }, (_, index) => `选项${index + 1}`)
</script>
