<template>
  <Upload url="//jsonplaceholder.typicode.com/posts/" :default-files="defaultFiles"></Upload>
</template>

<script setup lang="ts">
import type { FileOptions } from 'vexip-ui'

const defaultFiles: FileOptions[] = [
  {
    name: 'vexip-ui.svg',
    url: '/vexip-ui.svg',
    status: 'success'
  },
  {
    name: 'vexip-ui.svg',
    url: '/vexip-ui.svg',
    status: 'fail'
  },
  {
    name: 'vexip-ui.svg',
    url: '/vexip-ui.svg',
    percentage: 66,
    status: 'uploading'
  }
]
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
