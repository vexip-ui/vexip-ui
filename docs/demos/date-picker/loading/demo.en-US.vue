<template>
  <DatePicker
    :loading="loading"
    placeholder="loading and editable"
    style="max-width: 300px"
  ></DatePicker>
  <br />
  <br />
  <DatePicker
    :loading="loading"
    loading-lock
    placeholder="loading and readonly"
    style="max-width: 300px"
  ></DatePicker>
  <p>
    Loading:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
