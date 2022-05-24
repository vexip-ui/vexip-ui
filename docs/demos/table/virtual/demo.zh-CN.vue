<template>
  <Table
    use-y-bar
    virtual
    :data="data"
    :width="800"
    :height="320"
  >
    <TableColumn id-key="selection" type="selection"></TableColumn>
    <TableColumn id-key="order" type="order"></TableColumn>
    <TableColumn id-key="name" name="Name"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref(Array.from({ length: 1000 }, (_, index) => {
  return {
    index,
    name: `Row ${index}`
  }
}))
</script>
