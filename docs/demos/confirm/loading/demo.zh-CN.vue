<template>
  <Button type="primary" @click="confirm">
    提交
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    title: '异步确认',
    content: '确认提交吗（将等待 3 秒）？',
    closable: true,
    loadingLock: true,
    onBeforeConfirm: () =>
      new Promise(resolve => {
        setTimeout(resolve, 3000)
      }),
  })

  if (isConfirm) {
    Message.success('提交成功')
  } else {
    Message.warning('取消提交')
  }
}

// 手动关闭
// Confirm.close()
</script>
