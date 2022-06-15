
<template>
  <Button type="error" @click="confirm">
    Delete
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TriangleExclamation } from '@vexip-ui/icons'

export default defineComponent({
  methods: {
    async confirm() {
      const isConfirm = await this.$confirm.open({
        content: 'Confrim to delete?',
        confirmType: 'error',
        icon: TriangleExclamation,
        iconColor: '#f03e3e'
      })

      if (isConfirm) {
        this.$message.success('Delete succeed')
      } else {
        this.$message.warning('Delete canceled')
      }
    }
  }
})
</script>
