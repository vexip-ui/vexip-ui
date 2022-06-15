<template>
  <Button type="success" @click="confirm">
    Uninstall
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async confirm() {
      const isConfirm = await this.$confirm.open({
        content: 'Are you sure want to uninstall?',
        confirmType: 'success',
        confirmText: 'Uninstall',
        cancelText: 'Reconsider'
      })

      if (isConfirm) {
        this.$message.success('Uninstall succeed')
      } else {
        this.$message.warning('Why not stick to your thinking?')
      }
    }
  }
})
</script>
