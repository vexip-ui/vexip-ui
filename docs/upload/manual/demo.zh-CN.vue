<template>
  <Upload
    ref="upload"
    multiple
    manual
    url="//jsonplaceholder.typicode.com/posts/"
    @on-change="handleChange"
  >
    <Button type="primary" :icon="IUpload">
      手动上传
    </Button>
  </Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload as IUpload } from '@vexip-ui/icons'

import type { Upload } from 'vexip-ui'

const fileIds = ref<string[]>([])
const upload = ref<InstanceType<typeof Upload> | null>(null)

// 设置了 url 时，可以通过 ref 获取组件并调用 execute 进行上传
async function doUpload() {
  if (!upload.value) return

  // 所有文件上传成功后回调
  // 发送了有效请求时 responses 为所有请求体的数组，否则为 false
  const responses = await upload.value.execute()

  if (responses) {
    responses.forEach(response => {
      if (response.id && !fileIds.value.includes(response.id)) {
        fileIds.value.push(response.id)
      }
    })
  }
}

// 未设置 url 时，可以通过 change 事件记录选择的文件，后续自行操作，如放入 FormData 中
function handleChange(files: File[]) {
  console.info(files)
}
</script>
