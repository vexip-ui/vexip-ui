<template>
  <div style="max-width: 400px;">
    <Slider v-model:value="value" :disabled="disabled"></Slider>
  </div>
  <p>
    Disabled:
    <Switch v-model:value="disabled"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(20)
const disabled = ref(false)
</script>
