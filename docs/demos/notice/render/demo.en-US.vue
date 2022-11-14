<template>
  <Button type="primary" @click="sendCustomizedNotice">
    Custom Render
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { BellSlashR } from '@vexip-ui/icons'
import { Icon, Notice } from 'vexip-ui'

function sendCustomizedNotice() {
  Notice.open({
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
        h(
          'div',
          {
            style: {
              paddingLeft: '3em'
            }
          },
          [
            'A custom ',
            h(
              'span',
              {
                style: {
                  color: '#fab005',
                  fontStyle: 'italic'
                }
              },
              'notice'
            )
          ]
        )
      ])
    }
  })
}
</script>
