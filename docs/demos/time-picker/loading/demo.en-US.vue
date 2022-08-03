<template>
  <TimePicker
    :loading="loading"
    placeholder="loading and editable"
    style="max-width: 300px;"
  ></TimePicker>
  <br />
  <br />
  <TimePicker
    :loading="loading"
    loading-lock
    placeholder="loading and readonly"
    style="max-width: 300px;"
  ></TimePicker>
  <p>
    Loading:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
