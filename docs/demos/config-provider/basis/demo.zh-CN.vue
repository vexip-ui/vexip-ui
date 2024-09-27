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
    <br />
    <br />
    <DatePicker type="month" style="max-width: 400px"></DatePicker>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'

import type { PropsOptions } from 'vexip-ui'

const months = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
]
const provideProps = reactive({
  datePicker: {
    slots: {
      panelMonth: ({ month }) =>
        h(
          'div',
          {
            class: 'vxp-date-picker__month-label-inner'
          },
          months[month - 1]
        )
    }
  },
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
