<template>
  <Table :data="data" :height="240" :width="1000">
    <TableColumnGroup name="Name">
      <TableColumn name="First Name" id-key="firstName"></TableColumn>
      <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    </TableColumnGroup>
    <TableColumnGroup name="Info">
      <TableColumn name="Age" id-key="age"></TableColumn>
      <TableColumnGroup name="Work">
        <TableColumn name="Job" id-key="job"></TableColumn>
        <TableColumn name="Email" id-key="email"></TableColumn>
      </TableColumnGroup>
    </TableColumnGroup>
    <TableColumn name="Address" id-key="address"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 10 }, (_, index) => {
    return {
      id: index + 1,
      firstName: `First ${index}`,
      lastName: `Last ${index}`,
      job: `Job ${index}`,
      age: 20 + index,
      email: `email${index}@vexip.ui`,
      address: `Address ${index}`
    }
  })
)
</script>
