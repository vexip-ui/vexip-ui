<template>
  <Button type="primary" @on-click="confirm">
    提交
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'

export default defineComponent({
  name: 'App',
  components: {
    Button
  },
  methods: {
    async confirm(this: any) {
      const isConfirm = await this.$confirm.open({
        content: '确认提交吗？',
        confirmType: 'success'
      })

      console.log(isConfirm)
    }
  }
})
</script>

<style lang="scss"></style>
