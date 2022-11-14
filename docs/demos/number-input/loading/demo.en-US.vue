<template>
  <NumberInput :loading="loading" placeholder="loading and editable"></NumberInput>
  <br />
  <br />
  <NumberInput :loading="loading" loading-lock placeholder="loading and readonly"></NumberInput>
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
.vxp-number-input {
  max-width: 300px;
}
</style>
