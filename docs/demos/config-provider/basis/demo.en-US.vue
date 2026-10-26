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
    <br />
    <br />
    <DatePicker type="month" style="max-width: 400px"></DatePicker>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'

import type { PropsOptions } from 'vexip-ui'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const provideProps = reactive({
  datePicker: {
    slots: {
      panelMonth: ({ month }) =>
        h(
          'div',
          {
            class: 'vxp-date-picker__month-label-inner',
          },
          months[month - 1],
        ),
    },
  },
  tag: {
    size: 'large',
    simple: true,
    closable: true,
  },
}) as PropsOptions

const locale = reactive({
  input: {
    placeholder: 'Input something...',
  },
})
</script>
