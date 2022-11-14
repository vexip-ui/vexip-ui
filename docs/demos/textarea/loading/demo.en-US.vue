<template>
  <Textarea :loading="loading" :max-length="10" placeholder="loading and editable"></Textarea>
  <br />
  <br />
  <Textarea :loading="loading" loading-lock placeholder="loading and readonly"></Textarea>
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
.vxp-textarea {
  max-width: 300px;
}
</style>
