<template>
  <Table :columns="columns" :data="data" :width="1000"></Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Helper functions can be used to infer type deduction
import { defineColumns } from 'vexip-ui'

const currentYear = new Date().getFullYear()

const columns = reactive(
  defineColumns([
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
      accessor: row => row.job,
      formatter: job => `Good ${job}`
    },
    {
      name: 'Age',
      key: 'age',
      formatter: age => `${age} (${currentYear - age})`
    }
  ])
)

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
</script>
