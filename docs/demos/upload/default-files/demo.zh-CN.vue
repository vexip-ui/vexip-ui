<template>
  <Upload url="//jsonplaceholder.typicode.com/posts/" :default-files="defaultFiles"></Upload>
</template>

<script setup lang="ts">
import type { FileOptions } from 'vexip-ui'

const defaultFiles: FileOptions[] = [
  {
    name: 'logo.png',
    url: '/logo.png',
    status: 'success'
  },
  {
    name: 'logo.png',
    url: '/logo.png',
    status: 'fail'
  },
  {
    name: 'logo.png',
    url: '/logo.png',
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
