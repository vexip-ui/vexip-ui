<template>
  <Upload
    multiple
    url="//jsonplaceholder.typicode.com/posts/"
    @success="handleSuccess"
  ></Upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fileIds = ref<string[]>([])

    // response 的具体类型由后端所决定
    function handleSuccess(response: { id: string | null }) {
      // 成功回调后，可以返回文件的 id 已做后续用途
      if (response.id && !fileIds.value.includes(response.id)) {
        fileIds.value.push(response.id)
      }
    }

    return { fileIds, handleSuccess }
  }
})
</script>
