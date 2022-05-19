<template>
  <div>
    <Button type="warning" @on-click="$notice.warning({ content: '一条自定义图标的提示消息', icon: 'question-circle' })">
      自定义图标
    </Button>
    <Button type="error" @on-click="$notice.error({ content: '一条自定义图标颜色的提示消息', iconColor: 'green' })">
      自定义图标颜色
    </Button>
    <Button type="primary" @on-click="$notice.info({ content: '一条对象渲染图标的提示消息', icon: { name: 'spinner', pulse: true } })">
      对象渲染图标
    </Button>
    <Button type="success" @on-click="sendCustomizedIconNotice">
      函数渲染图标
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'

export default defineComponent({
  methods: {
    sendCustomizedIconNotice() {
      this.$notice.success({
        content: '一条函数渲染图标的提示消息',
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
