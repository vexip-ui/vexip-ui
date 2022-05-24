
<template>
  <Button type="error" @on-click="confirm">
    删除
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Confirm, Message } from 'vexip-ui'

export default defineComponent({
  setup() {
    async function confirm() {
      const isConfirm = await Confirm.open({
        content: '确认删除吗？',
        confirmType: 'error'
      })

      if (isConfirm) {
        Message.success('删除成功')
      } else {
        Message.warning('取消删除')
      }
    }

    return { confirm }
  }
})
</script>
