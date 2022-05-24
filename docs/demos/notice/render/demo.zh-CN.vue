<template>
  <Button type="primary" @on-click="sendCustomizedNotice">
    自定义渲染
  </Button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'

export default defineComponent({
  methods: {
    sendCustomizedNotice() {
      this.$notice.open({
        duration: 5000,
        closable: true,
        renderer: () => {
          return h('span', [
            h(Icon, {
              name: 'bell-slash',
              scale: 2,
              style: {
                position: 'absolute',
                color: '#339af0'
              }
            }),
            h('div', {
              style: {
                paddingLeft: '3em'
              }
            }, [
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
          ])
        }
      })
    }
  }
})
</script>
