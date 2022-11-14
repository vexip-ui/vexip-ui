<template>
  <Slider
    v-model:value="value"
    :min="50"
    :max="200"
    style="max-width: 400px;"
  ></Slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(60)
</script>
