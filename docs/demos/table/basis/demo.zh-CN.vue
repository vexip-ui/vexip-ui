<template>
  <Table
    :columns="columns"
    :data="data"
    :width="1000"
    :side-padding="[10, 5]"
  ></Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// 在 typescript 时可以使用辅助函数来帮助类型推导
import { defineColumns } from 'vexip-ui'

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
      accessor(row) {
        return row.job
      }
    },
    {
      name: 'Age',
      key: 'age'
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
