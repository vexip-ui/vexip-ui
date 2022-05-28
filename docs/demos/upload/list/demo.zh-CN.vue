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
      <Alert icon type="info" :title="`自定义的内容${isDragOver ? '（松开进行上传）' : ''}`">
        <p style="margin: 0;">
          将 Upload 组件作为一个包裹组件，在内部渲染自定义内容。
        </p>
        <p style="margin: 0;">
          尝试将文件或文件夹拖拽进此处。
        </p>
      </Alert>
    </template>
  </Upload>
  <Modal v-model:active="listActive" transfer title="上传列表">
    <div style="width: 500px;">
      <UploadList :files="files" type="card"></UploadList>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import type { Upload } from 'vexip-ui'

export default defineComponent({
  setup() {
    const listActive = ref(false)
    const upload = ref<InstanceType<typeof Upload> | null>(null)
    const files = computed(() => upload.value?.renderFiles ?? [])

    return { listActive, upload, files }
  }
})
</script>
