<template>
  <Button type="error" @click="confirm">
    删除
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TriangleExclamation } from '@vexip-ui/icons'

export default defineComponent({
  methods: {
    async confirm() {
      const isConfirm = await this.$confirm.open({
        content: '确认删除吗？',
        confirmType: 'error',
        icon: TriangleExclamation,
        iconColor: '#f03e3e'
      })

      if (isConfirm) {
        this.$message.success('删除成功')
      } else {
        this.$message.warning('取消删除')
      }
    }
  }
})
</script>
