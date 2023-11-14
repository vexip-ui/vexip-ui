<template>
  <Button
    type="warning"
    @click="Notice.warning({ content: 'A notice with custom icon', icon: CircleQuestion })"
  >
    Custom Icon
  </Button>
  <Button
    type="error"
    @click="Notice.error({ content: 'A notice with custom icon color', iconColor: 'green' })"
  >
    Custom Icon Color
  </Button>
  <Button type="success" @click="sendCustomizedIconNotice">
    Render Method
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { Icon, Notice } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

function sendCustomizedIconNotice() {
  Notice.success({
    content: 'A notice that using icon render method',
    icon: () => {
      return h(Icon, {
        icon: Share,
        flip: 'horizontal'
      })
    }
  })
}
</script>
