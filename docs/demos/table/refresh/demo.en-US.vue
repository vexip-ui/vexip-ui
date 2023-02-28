<template>
  <Button type="primary" @click="active = !active">
    Open Modal
  </Button>
  <Modal v-model:active="active" modal-style="min-width: 800px;" @show="refresh">
    <Table ref="table" :data="data" width="100%">
      <TableColumn name="First Name" id-key="firstName"></TableColumn>
      <TableColumn name="Last Name" id-key="lastName"></TableColumn>
      <TableColumn name="Job" id-key="job"></TableColumn>
      <TableColumn name="Age" id-key="age"></TableColumn>
    </Table>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableExposed } from 'vexip-ui'

const table = ref<TableExposed>()

const active = ref(false)
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
    age: '40'
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

function refresh() {
  table.value?.refresh()
}
</script>
