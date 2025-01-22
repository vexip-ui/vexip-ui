<template>
  <div style="max-width: 400px">
    <Slider v-model:value="value" range range-draggable></Slider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([20, 50])
</script>
