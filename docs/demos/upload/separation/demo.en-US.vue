<template>
  <Upload
    ref="upload"
    multiple
    allow-drag
    disabled-click
    manual
    hidden-files
    directory
    :count-limit="10"
    @change="listActive = true"
  >
    <template #default="{ isDragOver }">
      <Alert icon type="info" :title="`Custom Content${isDragOver ? ' (Drop to Upload)' : ''}`">
        <p style="margin: 0;">
          Use the Upload component as a wrapper to render custom content inside.
        </p>
        <p style="margin: 0;">
          Try to drag and drop a file or folder into here.
        </p>
      </Alert>
    </template>
  </Upload>
  <Modal v-model:active="listActive" transfer title="上传列表">
    <div style="max-width: 500px;">
      <UploadList :files="files" type="card" @delete="deleteFile"></UploadList>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Upload, FileState } from 'vexip-ui'

const listActive = ref(false)
const upload = ref<InstanceType<typeof Upload> | null>(null)
const files = computed(() => upload.value?.renderFiles ?? [])

function deleteFile(file: FileState) {
  upload.value?.deleteFile(file)
}
</script>
