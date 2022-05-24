<template>
  <Upload url="//jsonplaceholder.typicode.com/posts/" @on-success="handleSuccess"></Upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fileId = ref<string | null>(null)

    // response 的具体类型由后端所决定
    function handleSuccess(response: { id: string | null }) {
      // 成功回调后，可以返回文件的 id 已做后续用途
      fileId.value = response.id
    }

    return { fileId, handleSuccess }
  }
})
</script>
