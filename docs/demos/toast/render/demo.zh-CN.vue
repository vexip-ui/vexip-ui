<template>
  <Button type="info" @click="showCustomizedToast">
    自定义渲染
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Icon, Toast } from 'vexip-ui'
import { Lightbulb } from '@vexip-ui/icons'

function showCustomizedToast() {
  Toast.success({
    duration: 4000,
    closable: true,
    renderer: () => [
      h(Icon, {
        icon: Lightbulb,
        style: {
          marginBottom: '5px',
          color: '#339af0',
          scale: 1.6
        }
      }),
      '自定义',
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
    ]
  })
}
</script>
