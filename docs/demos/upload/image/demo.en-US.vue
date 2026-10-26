<template>
  <Upload
    multiple
    allow-drag
    manual
    image
    :default-files="defaultFiles"
  ></Upload>
</template>

<script setup lang="ts">
import type { UploadFileOptions } from 'vexip-ui'

const defaultFiles: UploadFileOptions[] = [
  {
    name: 'vexip-ui.svg',
    url: 'https://www.vexipui.com/vexip-ui.svg',
    status: 'success',
  },
  {
    name: 'vexip-ui.svg',
    url: 'https://www.vexipui.com/vexip-ui.svg',
    status: 'fail',
  },
  {
    name: 'vexip-ui.svg',
    url: 'https://www.vexipui.com/vexip-ui.svg',
    percentage: 66,
    status: 'uploading',
  },
]
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
