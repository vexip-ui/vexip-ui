<template>
  <Table
    use-y-bar
    virtual
    stripe
    :data="data"
    :width="800"
    :height="320"
    :row-height="40"
  >
    <TableColumn type="expand" id-key="expand">
      <template #default="{ row, leftFixed, rightFixed, }">
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
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref(Array.from({ length: 15000 }, (_, index) => {
  return {
    index,
    name: `Row ${index}`
  }
}))
</script>
