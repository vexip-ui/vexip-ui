<template>
  <Upload
    multiple
    allow-drag
    manual
    directory
    url="//jsonplaceholder.typicode.com/posts/"
    :count-limit="10"
    @success="handleSuccess"
  ></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { FileState } from 'vexip-ui'

const fileIds = ref<string[]>([])

// response 的具体类型由后端所决定
function handleSuccess(file: FileState, response: { id: string | null }) {
  // 成功回调后，可以返回文件的 id 已做后续用途
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
