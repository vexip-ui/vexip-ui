<template>
  <Select :loading="loading" placeholder="loading and editable" :options="options"></Select>
  <br />
  <br />
  <Select
    :loading="loading"
    loading-lock
    placeholder="loading and readonly"
    :options="options"
  ></Select>
  <p>
    Loaidng:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['Option 1', 'Option 2', 'Option 3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
