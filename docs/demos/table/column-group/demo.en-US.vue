<template>
  <Table
    :data="data"
    border
    :height="280"
    :width="1000"
    use-x-bar
    use-y-bar
  >
    <TableColumnGroup name="Useless">
      <!-- Will be ignored if no children -->
    </TableColumnGroup>
    <TableColumnGroup name="Name" fixed>
      <TableColumn name="First Name" id-key="firstName" :width="160"></TableColumn>
      <TableColumn name="Last Name" id-key="lastName" :width="160"></TableColumn>
    </TableColumnGroup>
    <TableColumnGroup name="Info">
      <TableColumn
        name="Age"
        id-key="age"
        fixed
        :width="60"
      ></TableColumn>
      <TableColumnGroup name="Work">
        <TableColumn name="Company" id-key="company" :width="180"></TableColumn>
        <TableColumn name="Job" id-key="job" :width="180"></TableColumn>
      </TableColumnGroup>
      <TableColumn name="Email" id-key="email" :width="280"></TableColumn>
    </TableColumnGroup>
    <TableColumn
      name="Action"
      id-key="action"
      fixed="right"
      :width="120"
    >
      <a href="javascript:void 0">Action</a>
    </TableColumn>
    <TableColumn name="Address" id-key="address" :width="200"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive(
  Array.from({ length: 10 }, (_, index) => {
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
)
</script>
