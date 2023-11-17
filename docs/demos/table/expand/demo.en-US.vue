<template>
  <Table
    use-x-bar
    :data="data"
    :width="800"
    @row-expand="handleExpand"
  >
    <TableColumn type="expand" id-key="expand" fixed>
      <template #default="{ row, leftFixed, rightFixed }">
        <Grid
          :style="{
            padding: `20px ${rightFixed + 10}px 20px ${leftFixed + 10}px`,
            backgroundColor: 'var(--bg-color)'
          }"
        >
          <Cell :width="12">
            Full Name: {{ `${row.firstName} ${row.lastName}` }}
          </Cell>
          <Cell :width="12">
            Age: {{ row.age }}
          </Cell>
          <Cell :width="12">
            Job: {{ row.job }}
          </Cell>
          <Cell :width="12">
            Email: {{ row.email }}
          </Cell>
        </Grid>
      </template>
    </TableColumn>
    <TableColumn name="First Name" id-key="firstName" fixed></TableColumn>
    <TableColumn name="Last Name" id-key="lastName" :width="300"></TableColumn>
    <TableColumn name="Job" id-key="job" :width="300"></TableColumn>
    <TableColumn name="Age" id-key="age" :width="300"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import type { TableRowPayload } from 'vexip-ui'

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
      address: `Address ${index}`
    }
  })
)

function handleExpand({ row, expanded }: TableRowPayload) {
  console.info(row, expanded!)
}
</script>
