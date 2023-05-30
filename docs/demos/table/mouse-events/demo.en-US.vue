<template>
  <Table
    :data="data"
    :width="1000"
    @row-enter="handleRowEnter"
    @row-contextmenu="handleRowContextmenu"
    @cell-enter="handleCellEnter"
    @cell-click="handleCellClick"
    @cell-dblclick="handleCellDblclick"
  >
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
  <p>Current row: {{ currentRow }}</p>
  <p>Menu opened row: {{ menuRow }}</p>
  <p>Current cell: {{ currentCell }}</p>
  <p>Clicked cell: {{ clickedCell }}</p>
  <p>Double-clicked cell: {{ dblclickedCell }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableCellPayload, TableRowPayload } from 'vexip-ui'

const currentRow = ref(-1)
const menuRow = ref(-1)
const currentCell = ref([-1, -1])
const clickedCell = ref([-1, -1])
const dblclickedCell = ref([-1, -1])

const data = [
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
]

function handleRowEnter(payload: TableRowPayload) {
  currentRow.value = payload.index
}

function handleRowContextmenu(payload: TableRowPayload) {
  payload.event.preventDefault()

  menuRow.value = payload.index
}

function handleCellEnter(payload: TableCellPayload) {
  currentCell.value[0] = payload.rowIndex
  currentCell.value[1] = payload.columnIndex
}

function handleCellClick(payload: TableCellPayload) {
  clickedCell.value[0] = payload.rowIndex
  clickedCell.value[1] = payload.columnIndex
}

function handleCellDblclick(payload: TableCellPayload) {
  dblclickedCell.value[0] = payload.rowIndex
  dblclickedCell.value[1] = payload.columnIndex
}
</script>
