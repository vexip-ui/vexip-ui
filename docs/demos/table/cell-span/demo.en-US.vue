<template>
  <Table
    use-y-bar
    border
    :data="data"
    :width="1000"
    highlight
    :side-padding="10"
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
import { reactive } from 'vue'

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
      address: `Address ${index}`,
    }
  }),
)

function fistNameCellSpan({ index }: { index: number }) {
  if (index === 3) {
    return { colSpan: 2 }
  }
}

function lastNameCellSpan({ index }: { index: number }) {
  // The cell was merged first, so its merge attribute will be ignored
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
