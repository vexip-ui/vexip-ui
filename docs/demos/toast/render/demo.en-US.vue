<template>
  <Button type="info" @click="showCustomizedToast">
    Custom Render
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Lightbulb } from '@vexip-ui/icons'
import { Icon, Toast } from 'vexip-ui'

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
      'Custom Render',
      h(
        'span',
        {
          style: {
            color: '#fab005',
            fontStyle: 'italic'
          }
        },
        'Tip'
      )
    ]
  })
}
</script>
