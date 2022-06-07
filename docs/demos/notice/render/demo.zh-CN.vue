<template>
  <Button type="primary" @click="sendCustomizedNotice">
    自定义渲染
  </Button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'
import { BellSlashR } from '@vexip-ui/icons'

export default defineComponent({
  methods: {
    sendCustomizedNotice() {
      this.$notice.open({
        duration: 5000,
        closable: true,
        renderer: () => {
          return h('span', [
            h(Icon, {
              icon: BellSlashR,
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
