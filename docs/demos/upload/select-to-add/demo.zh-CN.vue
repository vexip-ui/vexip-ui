<template>
  <Upload
    v-model:file-list="fileList"
    select-to-add
    url="//jsonplaceholder.typicode.com/posts/"
    :on-before-upload="beforeUpload"
  ></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { UploadFileOptions, UploadFileState } from 'vexip-ui'

const fileList = ref<UploadFileOptions[]>([
  {
    name: 'qmhc.jpg',
    url: 'qmhc.jpg',
  },
])

function beforeUpload(file: UploadFileState) {
  console.info(file)
}
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
