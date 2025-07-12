<template>
  <Table :columns="columns" :data="data" :width="1000"></Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// 在 typescript 时可以使用辅助函数来帮助类型推导
import { defineTableColumns } from 'vexip-ui'

const currentYear = new Date().getFullYear()

const columns = reactive(
  defineTableColumns([
    {
      name: 'First Name',
      key: 'firstName',
      maxWidth: 200,
    },
    {
      name: 'Last Name',
      key: 'lastName',
      maxWidth: 200,
    },
    {
      name: 'Job',
      key: 'job',
      accessor: row => row.job,
      formatter: job => `Good ${job}`,
      width: '15%',
    },
    {
      name: 'Age',
      key: 'age',
      formatter: age => `${age} (${currentYear - age})`,
      width: '10%',
      minWidth: 120,
    },
    {
      name: 'Email',
      key: 'email',
    },
  ]),
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
      address: `Address ${index}`,
    }
  }),
)
</script>
