<template>
  <Table
    use-x-bar
    use-y-bar
    :columns="columns"
    :data="data"
    :width="800"
    :height="260"
  ></Table>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'

import { defineColumns } from 'vexip-ui'

const columns = reactive(
  defineColumns([
    { type: 'selection', fixed: true },
    {
      type: 'order',
      name: 'Order',
      fixed: true
    },
    {
      name: 'First Name',
      key: 'firstName',
      width: 220
    },
    {
      name: 'Last Name',
      key: 'lastName',
      width: 220
    },
    {
      name: 'Job',
      key: 'job',
      width: 160
    },
    {
      name: 'Age',
      key: 'age',
      width: 60,
      textAlign: 'center',
      fixed: 'right'
    },
    {
      name: 'Email',
      key: 'email',
      width: 240
    },
    {
      name: 'Action',
      key: 'action',
      width: 120,
      textAlign: 'center',
      fixed: 'right',
      renderer: () => h('a', { href: 'javascript:void 0' }, ['Action'])
    }
  ])
)
const data = reactive(
  Array.from({ length: 10 }, (_, index) => {
    return {
      id: index + 1,
      firstName: `First ${index}`,
      lastName: `Last ${index}`,
      company: `Company ${index}`,
      job: `Job ${index}`,
      age: 20 + index,
      email: `email${index}@vexip.ui`,
      address: `Address ${index}`
    }
  })
)
</script>
