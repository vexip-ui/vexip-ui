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

const fileIds = ref<string[]>([])

function handleSuccess(response: { id: string | null }) {
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
