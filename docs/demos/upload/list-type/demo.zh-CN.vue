<template>
  <Upload list-type="thumbnail" button-label="缩略图列表" :default-files="defaultFiles"></Upload>
  <br />
  <br />
  <Upload list-type="card" button-label="卡片列表" :default-files="defaultFiles"></Upload>
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
