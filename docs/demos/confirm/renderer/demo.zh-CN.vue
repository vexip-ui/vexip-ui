<template>
  <Button type="primary" @click="confirm">
    提交
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Button, Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: '确认提交吗？',
    renderer: (options, confirm, cancel) => {
      return h(
        'div',
        {
          style: 'display: flex; align-items: center; padding: 10px'
        },
        [
          h('span', options.content),
          h('span', { style: 'flex: auto' }),
          h(Button, { size: 'small', onClick: cancel }, '取消'),
          h(Button, { type: 'primary', size: 'small', onClick: confirm }, '确认')
        ]
      )
    }
  })

  if (isConfirm) {
    Message.success('提交成功')
  } else {
    Message.warning('取消提交')
  }
}
</script>
