<template>
  <div>
    <Button type="primary" @click="sendNotice">
      Closable
    </Button>
    <Button type="warning" @click="$notice.warning({ title: 'Notice Title', closable: true })">
      Closable Title Only
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
        title: 'Notice Title',
        content: 'A closable notice',
        closable: true
      })
    }

    return { sendNotice }
  }
})
</script>
