<template>
  <div>
    <Button
      type="warning"
      @click="Message.warning({ content: '一条自定义图标的消息', icon: CircleQuestion })"
    >
      自定义图标
    </Button>
    <Button
      type="error"
      @click="Message.error({ content: '一条自定义图标颜色的消息', iconColor: 'green' })"
    >
      自定义图标颜色
    </Button>
    <Button type="success" @click="sendCustomizedIconMessage">
      函数渲染图标
    </Button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Icon, Message } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

function sendCustomizedIconMessage() {
  Message.success({
    content: '一条函数渲染图标的消息',
    icon: () => {
      return h(Icon, {
        icon: Share,
        flip: 'horizontal'
      })
    }
  })
}
</script>
