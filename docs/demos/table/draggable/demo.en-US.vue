<template>
  <Table
    row-draggable
    :columns="columns"
    :data="data"
    :width="1000"
  ></Table>
  <br />
  <Table
    :columns="columns"
    :data="data"
    :width="1000"
    disabled-tree
  >
    <TableColumn type="drag"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const columns = reactive([
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
  },
  {
    name: 'Age',
    key: 'age',
  },
])
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
