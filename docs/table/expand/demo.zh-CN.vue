<template>
  <Table :data="data">
    <TableColumn type="expand" id-key="expand">
      <template #default="{ row }">
        <Row style="padding: 20px 40px; background-color: #f8f9fa;">
          <Column :span="12">
            Full Name: {{ `${row.firstName} ${row.lastName}` }}
          </Column>
          <Column :span="12">
            Age: {{ row.age }}
          </Column>
          <Column :span="12">
            Job: {{ row.job }}
          </Column>
          <Column :span="12">
            Email: {{ row.email }}
          </Column>
        </Row>
      </template>
    </TableColumn>
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      data: [
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
          _expanded: true
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
      ]
    }
  }
})
</script>
