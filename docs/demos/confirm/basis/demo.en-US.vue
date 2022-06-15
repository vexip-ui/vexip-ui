<template>
  <Button type="primary" @click="confirm">
    Submit
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async confirm() {
      const isConfirm = await this.$confirm.open('Confirm to submit?')

      if (isConfirm) {
        this.$message.success('submit succeed')
      } else {
        this.$message.warning('submit canceled')
      }
    }
  }
})
</script>
