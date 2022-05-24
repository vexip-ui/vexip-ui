<template>
  <div>
    <Button type="primary" @on-click="sendNotice">
      可关闭提示
    </Button>
    <Button type="warning" @on-click="$notice.warning({ title: '提示的标题', closable: true })">
      可关闭的仅标题提示
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Notice } from 'vexip-ui'

export default defineComponent({
  setup() {
    function sendNotice() {
      Notice.info({
        title: '提示的标题',
        content: '一条可关闭的提示消息',
        closable: true
      })
    }

    return { sendNotice }
  }
})
</script>
