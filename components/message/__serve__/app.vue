<template>
  <Button @on-click="Message.open({ ...permanent, icon: 'info-circle' })">
    一般消息
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Message[meta.type](permanent)"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Message[meta.type]({ ...permanent, background: true })"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Message[meta.type]({ ...permanent, color: true })"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Message[meta.type]({ ...permanent, background: true, color: true })"
  >
    {{ meta.name }}
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/button'
import { Message } from '..'

const metaData = [
  { name: '一般消息', type: 'info' as const },
  { name: '成功消息', type: 'success' as const },
  { name: '警告消息', type: 'warning' as const },
  { name: '错误消息', type: 'error' as const }
]

const permanent = {
  content: '一条持久的消息',
  duration: 0,
  closable: true
}
</script>
