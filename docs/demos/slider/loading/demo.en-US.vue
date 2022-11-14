<template>
  <p>Loading and editable:</p>
  <Slider :value="40" :loading="loading"></Slider>
  <p>Loading and readonly:</p>
  <Slider :value="20" :loading="loading" loading-lock></Slider>
  <p>
    Loading:
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
