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
  <p>当前行：{{ currentRow }}</p>
  <p>打开菜单的行：{{ menuRow }}</p>
  <p>当前单元格：{{ currentCell }}</p>
  <p>点击了的单元格：{{ clickedCell }}</p>
  <p>双击了的单元格：{{ dblclickedCell }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableCellPayload, TableRowPayload } from 'vexip-ui'

const currentRow = ref(-1)
const menuRow = ref(-1)
const currentCell = ref([-1, -1])
const clickedCell = ref([-1, -1])
const dblclickedCell = ref([-1, -1])

const data = Array.from({ length: 5 }, (_, index) => {
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
