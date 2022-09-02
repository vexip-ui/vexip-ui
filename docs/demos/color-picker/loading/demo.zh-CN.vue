<template>
  <ColorPicker :loading="loading" placeholder="加载中可编辑"></ColorPicker>
  <br />
  <br />
  <ColorPicker :loading="loading" loading-lock placeholder="加载中不可编辑"></ColorPicker>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
