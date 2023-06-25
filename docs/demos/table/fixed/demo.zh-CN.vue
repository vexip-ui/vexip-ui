<template>
  <Table
    use-x-bar
    use-y-bar
    :columns="columns"
    :data="data"
    :width="800"
    :height="260"
  ></Table>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { defineColumns } from 'vexip-ui'

const columns = ref(
  defineColumns([
    { type: 'selection', fixed: true },
    {
      type: 'order',
      name: 'Order',
      fixed: true
    },
    {
      name: 'First Name',
      key: 'firstName',
      width: 220
    },
    {
      name: 'Last Name',
      key: 'lastName',
      width: 220
    },
    {
      name: 'Job',
      key: 'job',
      width: 160
    },
    {
      name: 'Age',
      key: 'age',
      width: 60,
      textAlign: 'center',
      fixed: 'right'
    },
    {
      name: 'Email',
      key: 'email',
      width: 240
    },
    {
      name: 'Action',
      key: 'action',
      width: 120,
      textAlign: 'center',
      fixed: 'right',
      renderer: () => h('a', { href: 'javascript:void 0' }, ['Action'])
    }
  ])
)
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
  },
  {
    id: '6',
    job: 'Dentist',
    email: 'Phillip_Rixon8188@gmail.com',
    firstName: 'Phillip',
    lastName: 'Rixon',
    age: '37'
  },
  {
    id: '7',
    job: 'Web Developer',
    email: 'Liam_Pickard9810@ovock.tech',
    firstName: 'Liam',
    lastName: 'Pickard',
    age: '32'
  },
  {
    id: '8',
    job: 'Staffing Consultant',
    email: 'Ruth_Mcleod599@naiker.biz',
    firstName: 'Ruth',
    lastName: 'Mcleod',
    age: '21'
  },
  {
    id: '9',
    job: 'Stockbroker',
    email: 'Marvin_Lakey4748@fuliss.net',
    firstName: 'Marvin',
    lastName: 'Lakey',
    age: '41'
  },
  {
    id: '10',
    job: 'Lecturer',
    email: 'Deborah_Santos5515@ubusive.com',
    firstName: 'Deborah',
    lastName: 'Santos',
    age: '29'
  }
])
</script>
