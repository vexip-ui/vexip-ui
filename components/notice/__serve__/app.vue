<template>
  <Button @on-click="Notice.open({ ...permanent, icon: 'info-circle' })">
    一般消息
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Notice[meta.type](permanent)"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Notice[meta.type]({ ...permanent, background: true })"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Notice[meta.type]({ ...permanent, color: true })"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Notice[meta.type]({ ...permanent, background: true, color: true })"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button
    v-for="meta in metaData"
    :key="meta.type"
    :type="meta.type"
    @on-click="Notice[meta.type]({ ...titleOnly, background: true, color: true })"
  >
    {{ meta.name }}
  </Button>
  <br />
  <br />
  <Button type="warning" @on-click="blNotice.warning('左下角提示', '一条左下角提示消息', 0)">
    左下提示
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/button'
import { Notice } from '..'

const blNotice = Notice.clone()

blNotice.config({ placement: 'bottom-left' })

const metaData = [
  { name: '一般提醒', type: 'info' as const },
  { name: '成功提醒', type: 'success' as const },
  { name: '警告提醒', type: 'warning' as const },
  { name: '错误提醒', type: 'error' as const }
]

const permanent = {
  title: '提醒标题',
  content: '一条持久的提醒',
  duration: 0,
  closable: true
}

const titleOnly = {
  title: '提醒标题',
  duration: 0,
  closable: true
}
</script>
