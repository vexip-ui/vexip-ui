<template>
  <Button type="primary" @on-click="confirm">
    提交
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async confirm() {
      const isConfirm = await this.$confirm.open('确认提交吗？')

      if (isConfirm) {
        this.$message.success('提交成功')
      } else {
        this.$message.warning('取消提交')
      }
    }
  }
})
</script>
