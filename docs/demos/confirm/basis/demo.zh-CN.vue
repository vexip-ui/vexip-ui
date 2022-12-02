<template>
  <Button type="primary" @click="confirm">
    提交
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open('确认提交吗？')

  if (isConfirm) {
    Message.success('提交成功')
  } else {
    Message.warning('取消提交')
  }
}
</script>
