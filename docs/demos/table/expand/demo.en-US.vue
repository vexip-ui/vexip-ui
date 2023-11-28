<template>
  <Table
    use-x-bar
    :data="data"
    :width="1000"
    @row-expand="handleExpand"
  >
    <TableColumn type="expand" id-key="expand">
      <template #default="{ row }">
        <Grid>
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
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import type { TableRowPayload } from 'vexip-ui'

const data = reactive(
  Array.from({ length: 5 }, (_, index) => {
    return {
      id: index + 1,
      expanded: false,
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

data[1].expanded = true

function handleExpand({ row, expanded }: TableRowPayload) {
  console.info(row, expanded!)
}
</script>
