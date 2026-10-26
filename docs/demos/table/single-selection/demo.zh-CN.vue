<template>
  <Table ref="table" :data="data" :width="1000">
    <TableColumn type="selection" id-key="selection" single-select></TableColumn>
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
  <Button style="margin-top: 10px" @click="getSelectedRow">
    获取选择的行
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableExposed } from 'vexip-ui'

const table = ref<TableExposed>()

const data = Array.from({ length: 5 }, (_, index) => {
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
})

function getSelectedRow() {
  console.info(table.value?.getSelected()?.[0])
}
</script>
