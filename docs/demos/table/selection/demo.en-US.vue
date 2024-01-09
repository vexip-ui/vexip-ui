<template>
  <Table ref="table" :data="data" :width="1000">
    <TableColumn type="selection" id-key="selection"></TableColumn>
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
  <Button style="margin-top: 10px" @click="getSelectedRows">
    Get Selected Rows
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableExposed } from 'vexip-ui'

const table = ref<TableExposed>()

const data = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index + 1,
    checked: false,
    firstName: `First ${index}`,
    lastName: `Last ${index}`,
    company: `Company ${index}`,
    job: `Job ${index}`,
    age: 20 + index,
    email: `email${index}@vexip.ui`,
    address: `Address ${index}`
  }
})

data[1].checked = true

function getSelectedRows() {
  console.info(table.value?.getSelected() ?? [])
}
</script>
