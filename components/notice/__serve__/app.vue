<template>
  <Button type="primary" @on-click="$notice.info('提示的标题', '一条一般提示消息')">
    一般提示
  </Button>
  <Button type="success" @on-click="$notice.success('提示的标题', '一条成功提示消息')">
    成功提示
  </Button>
  <Button type="warning" @on-click="$notice.warning('提示的标题', '一条警告提示消息')">
    警告提示
  </Button>
  <Button type="error" @on-click="$notice.error('提示的标题', '一条错误提示消息')">
    错误提示
  </Button>
  <Button type="warning" @on-click="blNotice.warning('左下角提示', '一条左下角提示消息')">
    左下提示
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import { Notice } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Button
  },
  setup() {
    const blNotice = Notice.clone()

    blNotice.config({ placement: 'bottom-left' })

    return {
      blNotice
    }
  }
})
</script>

<style lang="scss"></style>
