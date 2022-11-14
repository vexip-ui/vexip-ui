<template>
  <Upload url="//jsonplaceholder.typicode.com/posts/" @success="handleSuccess"></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileId = ref<string | null>(null)

// The specific type of response is determined by the backend
function handleSuccess(response: { id: string | null }) {
  // After successful callback, the id of the file can be returned for subsequent use
  fileId.value = response.id
}
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
