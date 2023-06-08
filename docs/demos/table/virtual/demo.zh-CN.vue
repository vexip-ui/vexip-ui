<template>
  <Table
    use-y-bar
    virtual
    stripe
    :data="data"
    :width="1000"
    :height="320"
    :row-height="40"
  >
    <TableColumn type="drag"></TableColumn>
    <TableColumn type="expand" id-key="expand">
      <template #default="{ row, leftFixed, rightFixed }">
        <div
          :style="{
            padding: `20px ${rightFixed + 10}px 20px ${leftFixed + 10}px`,
            backgroundColor: 'var(--bg-color)'
          }"
        >
          The {{ row.name }} expanded content
        </div>
      </template>
    </TableColumn>
    <TableColumn id-key="selection" type="selection"></TableColumn>
    <TableColumn id-key="order" type="order"></TableColumn>
    <TableColumn id-key="name" name="Name"></TableColumn>
    <TableColumn
      id-key="value"
      name="Value"
      sorter
      :filter="filter"
    ></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { defineFilter } from 'vexip-ui'

const data = ref(
  Array.from({ length: 15000 }, (_, index) => {
    return {
      index,
      name: `Row ${index}`,
      value: String(Math.round(1000 * Math.random()))
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
