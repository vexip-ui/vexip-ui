<template>
  <Table :data="data" :width="800" @row-expand="handleExpand">
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
            {{ leftFixed }}
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
import { ref } from 'vue'

import type { TableRowPayload } from 'vexip-ui'

const data = ref([
  {
    id: '1',
    job: 'Cashier',
    email: 'Angelique_Walsh2268@twace.org',
    firstName: 'Angelique',
    lastName: 'Walsh',
    age: '58'
  },
  {
    id: '2',
    job: 'Stockbroker',
    email: 'Aeris_Drake5867@gmail.com',
    firstName: 'Aeris',
    lastName: 'Drake',
    age: '40',
    expanded: true
  },
  {
    id: '3',
    job: 'Machine Operator',
    email: 'Elisabeth_Rogers7566@sheye.org',
    firstName: 'Elisabeth',
    lastName: 'Rogers',
    age: '56'
  },
  {
    id: '4',
    job: 'Audiologist',
    email: 'Sharon_Tanner5855@nickia.com',
    firstName: 'Sharon',
    lastName: 'Tanner',
    age: '58'
  },
  {
    id: '5',
    job: 'Cashier',
    email: 'Evie_Farmer6650@typill.biz',
    firstName: 'Evie',
    lastName: 'Farmer',
    age: '26'
  }
])

function handleExpand({ row, expanded }: TableRowPayload) {
  console.info(row, expanded!)
}
</script>
