<template>
  <div style="max-width: 400px;">
    <Slider v-model:value="value" range :disabled="disabled"></Slider>
  </div>
  <p>
    Disabled:
    <Switch v-model:value="disabled"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
const disabled = ref(false)
</script>
