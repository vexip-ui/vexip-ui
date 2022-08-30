<template>
  <Table :columns="columns" :data="data" :width="1000"></Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { defineColumns } from 'vexip-ui'

export default defineComponent({
  data() {
    return {
      columns: defineColumns([
        {
          name: 'First Name',
          key: 'firstName'
        },
        {
          name: 'Last Name',
          key: 'lastName'
        },
        {
          name: 'Job',
          key: 'job'
        },
        {
          name: 'Age',
          key: 'age',
          sorter: {
            able: true,
            type: 'asc'
          }
        }
      ]),
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
      ]
    }
  }
})
</script>
