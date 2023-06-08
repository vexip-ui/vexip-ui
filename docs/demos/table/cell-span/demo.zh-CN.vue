<template>
  <Table
    use-y-bar
    border
    :data="data"
    :width="1000"
    highlight
  >
    <TableColumn name="First Name" id-key="firstName" :cell-span="fistNameCellSpan"></TableColumn>
    <TableColumn
      name="Last Name"
      id-key="lastName"
      :head-span="2"
      :cell-span="lastNameCellSpan"
    ></TableColumn>
    <TableColumn name="Job" id-key="job" :cell-span="jobCellSpan"></TableColumn>
    <TableColumn name="Email" id-key="email" :cell-span="emailCellSpan"></TableColumn>
    <TableColumn name="Age" id-key="age" :cell-span="ageCellSpan"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

function fistNameCellSpan({ index }: { index: number }) {
  if (index === 3) {
    return { colSpan: 2 }
  }
}

function lastNameCellSpan({ index }: { index: number }) {
  // 该单元格先被合并了，所以其合并属性将会被忽略
  if (index === 3) {
    return { colSpan: 2 }
  }
}

function jobCellSpan({ index }: { index: number }) {
  if (index === 1) {
    return { rowSpan: 2 }
  }
}

function emailCellSpan({ index }: { index: number }) {
  if (index === 3) {
    return { colSpan: 3, rowSpan: 3 }
  }
}

function ageCellSpan({ index }: { index: number }) {
  if (index === 0) {
    return { colSpan: 2, rowSpan: 2 }
  }
}
</script>
