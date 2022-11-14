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

import type { FileOptions, FileState } from 'vexip-ui'

const fileList = ref<FileOptions[]>([
  {
    name: 'qmhc.jpg',
    url: 'qmhc.jpg'
  }
])

function beforeUpload(file: FileState) {
  console.info(file)
}
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
