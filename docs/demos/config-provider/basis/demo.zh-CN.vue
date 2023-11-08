<template>
  <ConfigProvider :props="provideProps" :locale="locale">
    <Tag type="primary">
      标签
    </Tag>
    <Tag type="warning" size="small">
      标签
    </Tag>
    <br />
    <br />
    <Input style="max-width: 400px"></Input>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import type { PropsOptions } from 'vexip-ui'

const provideProps = reactive({
  tag: {
    size: 'large',
    simple: true,
    closable: true
  }
}) as PropsOptions

const locale = reactive({
  input: {
    placeholder: '随便输入点什么'
  }
})
</script>
