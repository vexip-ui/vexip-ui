<template>
  <p>
    Loading and editable:
    <ColorPicker :loading="loading"></ColorPicker>
  </p>
  <p>
    Loading and readonly:
    <ColorPicker :loading="loading" loading-lock></ColorPicker>
  </p>
  <p>
    Loading:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
