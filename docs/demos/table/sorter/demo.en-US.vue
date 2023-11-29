<template>
  <Table
    :columns="columns"
    :data="data"
    :width="1000"
    @row-sort="handleRowSort"
  ></Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { defineTableColumns } from 'vexip-ui'

import type { TableSorterProfile } from 'vexip-ui'

const columns = reactive(
  defineTableColumns([
    { type: 'selection' },
    {
      type: 'order',
      name: '#'
    },
    {
      name: 'First Name',
      key: 'firstName'
    },
    {
      name: 'Last Name',
      key: 'lastName'
    },
    {
      name: 'Job',
      key: 'job'
    },
    {
      name: 'Value',
      key: 'value',
      sorter: {
        type: 'desc'
      }
    },
    {
      name: 'Age',
      key: 'age',
      sorter: {
        type: 'asc'
      }
    }
  ])
)

const data = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index + 1,
    firstName: `First ${index}`,
    lastName: `Last ${index}`,
    company: `Company ${index}`,
    job: `Job ${index}`,
    age: 20 + Math.round(40 * Math.random()),
    value: index % 2,
    email: `email${index}@vexip.ui`,
    address: `Address ${index}`
  }
})

function handleRowSort(profiles: TableSorterProfile[]) {
  console.info(profiles)
}
</script>
