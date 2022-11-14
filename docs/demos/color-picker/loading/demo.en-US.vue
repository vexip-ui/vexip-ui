<template>
  <ColorPicker :loading="loading" placeholder="loading and editable"></ColorPicker>
  <br />
  <br />
  <ColorPicker :loading="loading" loading-lock placeholder="loading and readonly"></ColorPicker>
  <p>
    Loaidng:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
