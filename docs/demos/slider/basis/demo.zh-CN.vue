<template>
  <div style="max-width: 400px;">
    <Slider v-model:value="value"></Slider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
