
<template>
  <Button type="error" @click="confirm">
    Delete
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Confirm, Message } from 'vexip-ui'

export default defineComponent({
  setup() {
    async function confirm() {
      const isConfirm = await Confirm.open({
        content: 'Confrim to delete?',
        confirmType: 'error'
      })

      if (isConfirm) {
        Message.success('Delete succeed')
      } else {
        Message.warning('Delete canceled')
      }
    }

    return { confirm }
  }
})
</script>
