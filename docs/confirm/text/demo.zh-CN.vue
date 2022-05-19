<template>
  <Button type="success" @on-click="confirm">
    卸载
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async confirm() {
      const isConfirm = await this.$confirm.open({
        content: '看我这么可怜，真的要卸载我吗？',
        confirmType: 'success',
        confirmText: '残忍卸载',
        cancelText: '容我三思'
      })

      if (isConfirm) {
        this.$message.success('卸载成功')
      } else {
        this.$message.warning('为什么不坚持你的想法')
      }
    }
  }
})
</script>
