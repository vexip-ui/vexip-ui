<template>
  <Upload
    url="https://run.mocky.io/v3/5b5ce2e6-b0b6-46d8-b578-639d9d714e92"
    @success="handleSuccess"
  ></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { UploadFileState } from 'vexip-ui'

const fileId = ref<number | null>(null)

// The specific type of response is determined by the backend
function handleSuccess(file: UploadFileState, response: { id: number | null }) {
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
