<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { defineFilter } from 'vexip-ui/lib/table'

interface RowData {
  id: string,
  job: string,
  email: string,
  firstName: string,
  lastName: string,
  age: string
}

export default defineComponent({
  setup() {
    const columns = ref([
      {
        name: 'First Name',
        key: 'firstName',
        filter: defineFilter({
          able: true,
          options: [
            { label: 'Starts with A', value: 'A' },
            { label: 'Starts with E', value: 'E' }
          ],
          method(value, row: RowData) {
            return row.firstName.startsWith(value)
          }
        })
      },
      {
        name: 'Last Name',
        key: 'lastName',
        filter: defineFilter({
          able: true,
          options: [
            { label: 'Starts with D', value: 'D' },
            { label: 'Starts with F', value: 'F' },
            { label: 'Starts with R', value: 'R' },
            { label: 'Starts with T', value: 'T' }
          ],
          multiple: true,
          method(values, row: RowData) {
            for (const value of values) {
              if (row.lastName.startsWith(value)) {
                return true
              }
            }

            return false
          }
        })
      },
      {
        name: 'Job',
        key: 'job'
      },
      {
        name: 'Age',
        key: 'age'
      }
    ])
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

    return { columns, data }
  }
})
</script>
