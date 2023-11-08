<template>
  <ConfigProvider :props="provideProps" :locale="locale">
    <Tag type="primary">
      Tag
    </Tag>
    <Tag type="warning" size="small">
      Tag
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
    placeholder: 'Input something...'
  }
})
</script>
