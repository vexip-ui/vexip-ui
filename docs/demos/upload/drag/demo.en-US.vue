<template>
  <Upload
    multiple
    allow-drag
    manual
    url="//jsonplaceholder.typicode.com/posts/"
    @success="handleSuccess"
  ></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { FileState } from 'vexip-ui'

const fileIds = ref<string[]>([])

function handleSuccess(file: FileState, response: { id: string | null }) {
  if (response.id && !fileIds.value.includes(response.id)) {
    fileIds.value.push(response.id)
  }
}
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
