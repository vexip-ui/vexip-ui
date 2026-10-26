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

// response 的具体类型由后端所决定
function handleSuccess(file: UploadFileState, response: { id: number | null }) {
  // 成功回调后，可以返回文件的 id 已做后续用途
  fileId.value = response.id
}
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
