<template>
  <Table ref="table" :data="data" :width="1000">
    <TableColumn type="selection" id-key="selection"></TableColumn>
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import type { Table } from 'vexip-ui'

export default defineComponent({
  setup() {
    const table = ref<InstanceType<typeof Table> | null>(null)
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
        age: '56',
        _checked: true
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

    function getSelectedRows() {
      return table.value?.getSelected() ?? []
    }

    return { data, table, getSelectedRows }
  }
})
</script>
