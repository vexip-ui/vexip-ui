<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 在 typescript 时可以使用辅助函数来帮助类型推导
import { defineColumns } from 'vexip-ui/es/table'

export default defineComponent({
  setup() {
    const columns = ref(defineColumns([
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
        key: 'job',
        accessor(row: { job: string }) {
          return row.job
        }
      },
      {
        name: 'Age',
        key: 'age'
      }
    ]))
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
