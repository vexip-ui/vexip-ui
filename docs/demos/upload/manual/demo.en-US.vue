<template>
  <Upload
    ref="upload"
    multiple
    manual
    url="//jsonplaceholder.typicode.com/posts/"
    @change="handleChange"
  >
    <div>
      <Button type="primary" :icon="IUpload">
        Select file
      </Button>
      <Button
        type="success"
        :icon="Check"
        style="margin-left: 6px"
        @click.stop="doUpload"
      >
        Manual upload
      </Button>
    </div>
  </Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Check, Upload as IUpload } from '@vexip-ui/icons'

import type { FileState, UploadExposed } from 'vexip-ui'

const fileIds = ref<string[]>([])
const upload = ref<UploadExposed>()

// When the url is set, you can get the component through ref and call execute to upload it
async function doUpload() {
  if (!upload.value) return

  // Callback after all files are uploaded successfully
  // responses is an array of all request bodies when a valid request was sent, false otherwise
  const responses = await upload.value.execute()

  if (responses) {
    responses.forEach(response => {
      if (response.id && !fileIds.value.includes(response.id)) {
        fileIds.value.push(response.id)
      }
    })
  }
}

// When the url is not set, you can record the selected file through the change event,
// and then operate it by yourself, such as putting it into a FormData
function handleChange(files: FileState[]) {
  console.info(files)
}
</script>

<style scoped>
.vxp-upload {
  width: 100%;
  max-width: 500px;
}
</style>
