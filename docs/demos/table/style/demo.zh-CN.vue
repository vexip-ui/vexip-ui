<template>
  <Table
    stripe
    border
    highlight
    :columns="columns"
    :data="data"
    :width="1000"
  ></Table>
  <br />
  <Table
    transparent
    highlight
    :columns="columns"
    :data="data"
    :width="1000"
  ></Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { defineTableColumns } from 'vexip-ui'

const columns = reactive(
  defineTableColumns([
    {
      name: 'First Name',
      key: 'firstName',
    },
    {
      name: 'Last Name',
      key: 'lastName',
    },
    {
      name: 'Job',
      key: 'job',
      accessor(row) {
        return row.job
      },
    },
    {
      name: 'Age',
      key: 'age',
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
