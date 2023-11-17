<template>
  <Table
    :data="data"
    :row-class="rowClass"
    :width="1000"
    :head-class="headClass"
    :head-style="headStyle"
    :head-attrs="hadeAttrs"
    :cell-class="cellClass"
  >
    <TableColumn
      name="First Name"
      id-key="firstName"
      :attrs="{ 'data-label': 'First Name' }"
    ></TableColumn>
    <TableColumn name="Last Name" id-key="lastName" class="demo-column-class"></TableColumn>
    <TableColumn name="Job" id-key="job" style="font-weight: bold"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import type { TableCellPropFn, TableHeadPropFn } from 'vexip-ui'

type ItemType<D> = D extends (infer I)[] ? I : Record<string, any>

const data = Array.from({ length: 10 }, (_, index) => {
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

const rowClass = 'demo-row-class'

const headClass: TableHeadPropFn = ({ index }) => `head-${index}`

const headStyle: TableHeadPropFn = ({ index }) => ({
  color: `var(--vxp-color-error-opacity-${index + 1})`
})

const hadeAttrs: TableHeadPropFn = ({ index }) => ({
  'data-index': index
})

const cellClass: TableCellPropFn<ItemType<typeof data>> = ({ rowIndex, columnIndex }) =>
  `cell-${rowIndex}-${columnIndex}`
</script>

<style scoped>
:deep(.demo-row-class) {
  color: #339af0;
}

:deep(.demo-column-class) {
  background-color: #fab005;
}
</style>
