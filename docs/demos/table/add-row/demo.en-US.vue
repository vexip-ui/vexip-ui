<template>
  <Table :data="data" :height="160" :width="1000">
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
  <br />
  <Button type="primary" @click="addRow">
    Add row
  </Button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive(Array.from({ length: 5 }, (_, index) => create(index)))

function create(index: number) {
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
}

function addRow() {
  data.push(create(data.at(-1)!.id + 1))
}
</script>
