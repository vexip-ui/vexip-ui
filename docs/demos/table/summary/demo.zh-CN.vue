<template>
  <Table
    use-y-bar
    :data="data"
    :width="1000"
    :height="300"
  >
    <TableColumn
      name="Name"
      id-key="name"
      fixed
      text-align="center"
      :width="180"
    >
      <template #summary="{ summary }">
        {{ summary.name }}
      </template>
    </TableColumn>
    <TableColumn
      v-for="(month, index) in months"
      :key="month"
      :name="month"
      :id-key="`m${index + 1}`"
      text-align="center"
    ></TableColumn>

    <TableSummary v-slot="{ meta }" name="Sum" id-key="sum">
      {{ meta.sum }}
    </TableSummary>
    <TableSummary v-slot="{ meta }" name="Min" id-key="min">
      {{ meta.min }}
    </TableSummary>
    <TableSummary v-slot="{ meta }" name="Max" id-key="max">
      {{ meta.max }}
    </TableSummary>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const random = () => Math.round(100 * Math.random())

const data = ref(
  Array.from({ length: 20 }, (_, index) => {
    return {
      index,
      name: `Project ${index + 1}`,
      m1: random(),
      m2: random(),
      m3: random(),
      m4: random(),
      m5: random(),
      m6: random(),
      m7: random(),
      m8: random(),
      m9: random(),
      m10: random(),
      m11: random(),
      m12: random()
    }
  })
)
</script>
