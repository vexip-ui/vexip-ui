<template>
  <Slider
    v-model:value="value"
    :step="5"
    :max="100"
    :min="-50"
    style="max-width: 400px"
  ></Slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(20)
</script>
