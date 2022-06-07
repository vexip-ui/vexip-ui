<template>
  <div>
    <Button type="warning" @click="$notice.warning({ content: '一条自定义图标的提示消息', icon: CircleQuestion })">
      自定义图标
    </Button>
    <Button type="error" @click="$notice.error({ content: '一条自定义图标颜色的提示消息', iconColor: 'green' })">
      自定义图标颜色
    </Button>
    <Button type="success" @click="sendCustomizedIconNotice">
      函数渲染图标
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

export default defineComponent({
  setup() {
    return { CircleQuestion }
  },
  methods: {
    sendCustomizedIconNotice() {
      this.$notice.success({
        content: '一条函数渲染图标的提示消息',
        icon: () => {
          return h(Icon, {
            icon: Share,
            flip: 'horizontal'
          })
        }
      })
    }
  }
})
</script>
