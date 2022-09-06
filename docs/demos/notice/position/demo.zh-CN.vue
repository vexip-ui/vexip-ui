<template>
  <div>
    <Button type="primary" @click="$notice.info('右上角提示', '一条右上角提示消息')">
      右上提示
    </Button>
    <Button type="success" @click="brNotice.success('右下角提示', '一条右下角提示消息')">
      右下提示
    </Button>
    <Button type="warning" @click="blNotice.warning('左下角提示', '一条左下角提示消息')">
      左下提示
    </Button>
    <Button type="error" @click="tlNotice.error('左上角提示', '一条左上角提示消息')">
      左上提示
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Notice } from 'vexip-ui'

const brNotice = Notice.clone()
const tlNotice = Notice.clone()
const blNotice = Notice.clone()

brNotice.config({ placement: 'bottom-right' })
tlNotice.config({ placement: 'top-left' })
blNotice.config({ placement: 'bottom-left' })
</script>
