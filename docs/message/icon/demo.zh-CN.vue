<template>
  <div>
    <Button type="warning" @on-click="$message.warning({ content: '一条自定义图标的消息', icon: 'question-circle' })">
      自定义图标
    </Button>
    <Button type="error" @on-click="$message.error({ content: '一条自定义图标颜色的消息', iconColor: 'green' })">
      自定义图标颜色
    </Button>
    <Button type="primary" @on-click="$message.info({ content: '一条对象渲染图标的消息', icon: { name: 'spinner', pulse: true } })">
      对象渲染图标
    </Button>
    <Button type="success" @on-click="sendCustomizedIconMessage">
      函数渲染图标
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'

export default defineComponent({
  methods: {
    sendCustomizedIconMessage() {
      this.$message.success({
        content: '一条函数渲染图标的消息',
        icon: () => {
          return h(Icon, {
            name: 'share',
            flip: 'horizontal'
          })
        }
      })
    }
  }
})
</script>
