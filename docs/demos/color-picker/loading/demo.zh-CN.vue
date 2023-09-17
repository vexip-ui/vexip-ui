<template>
  <p>
    加载中可编辑：
    <ColorPicker :loading="loading"></ColorPicker>
  </p>
  <p>
    加载中不可编辑：
    <ColorPicker :loading="loading" loading-lock></ColorPicker>
  </p>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
