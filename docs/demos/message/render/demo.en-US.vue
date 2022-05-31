<template>
  <Button type="primary" @click="sendCustomizedMessage">
    自定义渲染
  </Button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'

export default defineComponent({
  methods: {
    sendCustomizedMessage() {
      this.$message.open({
        duration: 5000,
        closable: true,
        renderer: () => {
          return h('span', [
            h(Icon, {
              name: 'bell-slash',
              style: {
                marginRight: '5px',
                color: '#339af0'
              }
            }),
            '一条自定义的',
            h(
              'span',
              {
                style: {
                  color: '#fab005',
                  fontStyle: 'italic'
                }
              },
              '消息'
            )
          ])
        }
      })
    }
  }
})
</script>
