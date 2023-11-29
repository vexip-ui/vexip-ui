<template>
  <Table
    use-x-bar
    use-y-bar
    :columns="columns"
    :data="data"
    :width="1000"
    :height="260"
  ></Table>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'

import { defineTableColumns } from 'vexip-ui'

const columns = reactive(
  defineTableColumns([
    { type: 'selection', fixed: true },
    {
      type: 'order',
      name: 'Order',
      fixed: true
    },
    {
      name: 'First Name',
      key: 'firstName',
      width: 160
    },
    {
      name: 'Last Name',
      key: 'lastName',
      width: 160
    },
    {
      name: 'Company',
      key: 'company',
      width: 180
    },
    {
      name: 'Job',
      key: 'job',
      width: 120
    },
    {
      name: 'Age',
      key: 'age',
      width: 60,
      textAlign: 'center',
      fixed: 'right'
    },
    {
      name: 'Address',
      key: 'address',
      width: 200
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
