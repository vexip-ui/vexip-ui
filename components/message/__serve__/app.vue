<template>
  <Button type="primary" @on-click="$message.info('一条一般消息')">
    一般消息
  </Button>
  <Button type="success" @on-click="$message.success('一条成功消息')">
    成功消息
  </Button>
  <Button type="warning" @on-click="$message.warning('一条警告消息')">
    警告消息
  </Button>
  <Button type="error" @on-click="$message.error('一条错误消息')">
    错误消息
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'

export default defineComponent({
  name: 'App',
  components: {
    Button
  }
})
</script>

<style lang="scss"></style>
