<template>
  <Table
    use-x-bar
    use-y-bar
    virtual
    stripe
    :data="data"
    :width="1000"
    :height="320"
    :row-height="40"
    col-resizable
  >
    <TableColumn type="drag" fixed></TableColumn>
    <TableColumn type="expand" id-key="expand" fixed>
      <template #default="{ row }">
        <div
          :style="{
            padding: '20px',
            backgroundColor: 'var(--bg-color)'
          }"
        >
          The {{ row.name }} expanded content
        </div>
      </template>
    </TableColumn>
    <TableColumn id-key="selection" type="selection" fixed></TableColumn>
    <TableColumn
      id-key="order"
      type="order"
      name="#"
      fixed
    ></TableColumn>
    <TableColumn
      id-key="name"
      name="Name"
      fixed
      :width="120"
    ></TableColumn>
    <TableColumn
      id-key="value"
      name="Value"
      sorter
      :filter="filter"
      :width="140"
    ></TableColumn>
    <TableColumn id-key="company" name="Company" :width="180"></TableColumn>
    <TableColumn id-key="job" name="Job" :width="120"></TableColumn>
    <TableColumn id-key="address" name="Address" :width="200"></TableColumn>
    <TableColumn id-key="email" name="Email" :width="280"></TableColumn>
    <TableColumn
      name="Action"
      id-key="action"
      fixed="right"
      text-align="center"
      :width="120"
    >
      <a href="javascript:void 0">Action</a>
    </TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { defineFilter } from 'vexip-ui'

const data = ref(
  Array.from({ length: 1500 }, (_, index) => {
    return {
      index,
      name: `Name ${index}`,
      company: `Company ${index}`,
      job: `Job ${index}`,
      value: String(Math.round(1000 * Math.random())),
      email: `email${index}@vexip.ui`,
      address: `Address ${index}`
    }
  })
)

const filter = defineFilter({
  options: Array.from({ length: 5 }, (_, index) => ({
    label: `Includes ${index * 2}`,
    value: `${index * 2}`
  })),
  multiple: true,
  method: (values, row: { value: string }) => {
    for (const value of values) {
      if (row.value.includes(value)) {
        return true
      }
    }

    return false
  }
})
</script>
