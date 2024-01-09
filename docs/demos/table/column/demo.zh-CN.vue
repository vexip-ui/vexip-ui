<template>
  <Table :columns="columns" :data="data" :width="1000">
    <TableColumn name="First Name" id-key="firstName" :order="0">
      <template #default="{ row }">
        <Icon style="margin-inline-end: 8px">
          <User></User>
        </Icon>
        {{ row.firstName }}
      </template>
    </TableColumn>
    <TableColumn
      name="Job"
      id-key="job"
      :accessor="jobAccessor"
      :order="3"
      :formatter="jobFormatter"
    ></TableColumn>
    <TableColumn
      name="Age"
      id-key="age"
      :order="2"
      :renderer="renderAge"
    ></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'

import { User } from '@vexip-ui/icons'

interface RowData {
  id: string,
  job: string,
  email: string,
  firstName: string,
  lastName: string,
  age: string
}

const columns = reactive([
  {
    name: 'Last Name',
    key: 'lastName',
    order: 1
  }
])
const data = reactive(
  Array.from({ length: 5 }, (_, index) => {
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

function jobAccessor(row: RowData) {
  return row.job
}

function jobFormatter(job: string) {
  return `Good ${job}`
}

function handleAgeClick() {
  console.info('clicked')
}

function renderAge({ row }: { row: RowData }) {
  return h(
    'span',
    {
      class: 'my-age',
      onClick: handleAgeClick
    },
    ['age: ', row.age]
  )
}
</script>
