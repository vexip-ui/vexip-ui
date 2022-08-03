<template>
  <Button type="primary" @click="sendCustomizedMessage">
    Custom Render
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
            'A custom ',
            h(
              'span',
              {
                style: {
                  color: '#fab005',
                  fontStyle: 'italic'
                }
              },
              'message'
            )
          ])
        }
      })
    }
  }
})
</script>
