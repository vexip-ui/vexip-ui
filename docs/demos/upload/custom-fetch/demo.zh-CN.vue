<template>
  <Upload
    url="https://run.mocky.io/v3/5b5ce2e6-b0b6-46d8-b578-639d9d714e92"
    :custom-fetch="doFetch"
    @success="handleSuccess"
  ></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { UploadFetchMethod, UploadFileState } from 'vexip-ui'

const fileId = ref<number | null>(null)

const doFetch: UploadFetchMethod = ({
  url,
  file,
  headers,
  data,
  field,
  pathField,
  withCredentials,
  onSuccess,
  onError,
  onAbort,
}) => {
  const controller = new AbortController()
  const { signal } = controller

  const formData = new FormData()

  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }

  formData.append(field || 'file', file)
  if (file.path) {
    formData.append(pathField || 'path', file.path)
  }

  fetch(url, {
    method: 'POST',
    body: formData,
    headers: headers,
    credentials: withCredentials ? 'include' : 'same-origin',
    signal,
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`)
      }

      onSuccess?.(await response.json())
    })
    .catch(error => {
      if (signal.aborted) {
        onAbort?.()
      } else {
        onError?.(error)
      }
    })

  return () => controller.abort()
}

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
