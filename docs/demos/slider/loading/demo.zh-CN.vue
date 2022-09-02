<template>
  <p>加载中可编辑：</p>
  <Slider :value="40" :loading="loading"></Slider>
  <p>加载中不可编辑：</p>
  <Slider :value="20" :loading="loading" loading-lock></Slider>
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
.vxp-slider {
  max-width: 400px;
}
</style>
