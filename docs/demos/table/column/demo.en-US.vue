<template>
  <Table :columns="columns" :data="data">
    <TableColumn name="First Name" id-key="firstName" :order="0">
      <template #default="{ row }">
        <Icon style="margin-right: 8px">
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
import { h, ref } from 'vue'

import { User } from '@vexip-ui/icons'

const columns = ref([
  {
    name: 'Last Name',
    key: 'lastName',
    order: 1
  }
])
const data = ref([
  {
    id: '1',
    job: 'Cashier',
    email: 'Angelique_Walsh2268@twace.org',
    firstName: 'Angelique',
    lastName: 'Walsh',
    age: '58'
  },
  {
    id: '2',
    job: 'Stockbroker',
    email: 'Aeris_Drake5867@gmail.com',
    firstName: 'Aeris',
    lastName: 'Drake',
    age: '40'
  },
  {
    id: '3',
    job: 'Machine Operator',
    email: 'Elisabeth_Rogers7566@sheye.org',
    firstName: 'Elisabeth',
    lastName: 'Rogers',
    age: '56'
  },
  {
    id: '4',
    job: 'Audiologist',
    email: 'Sharon_Tanner5855@nickia.com',
    firstName: 'Sharon',
    lastName: 'Tanner',
    age: '58'
  },
  {
    id: '5',
    job: 'Cashier',
    email: 'Evie_Farmer6650@typill.biz',
    firstName: 'Evie',
    lastName: 'Farmer',
    age: '26'
  }
])

function jobAccessor(row: { job: string }) {
  return row.job
}

function handleAgeClick() {
  console.info('clicked')
}

function renderAge({ row }: { row: { age: string } }) {
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
