<template>
  <div style="max-width: 1000px">
    <Table
      :data="data"
      :current-page="currentPage"
      :page-size="pageSize"
      @row-check="toggleChecked"
      @row-check-all="toggleAllChecked"
    >
      <TableColumn id-key="selection" type="selection"></TableColumn>
      <TableColumn id-key="group" name="Group"></TableColumn>
      <TableColumn id-key="member" name="Member"></TableColumn>
      <TableColumn id-key="found" name="Found"></TableColumn>
      <TableColumn id-key="progress" name="Progress"></TableColumn>
    </Table>
    <div style="margin: 10px 10px 0; text-align: right">
      <Pagination
        v-model:active="currentPage"
        :plugins="['total', , 'jump']"
        :total="data.length"
        :page-size="pageSize"
      ></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableRowPayload } from 'vexip-ui'

interface RowData {
  id: number,
  group: string,
  member: number,
  found: string,
  progress: number
}

const data = ref(mockData())
const pageSize = ref(5)
const currentPage = ref(1)

function mockData() {
  const data: RowData[] = []

  for (let i = 0; i < 20; ++i) {
    data.push({
      id: i,
      group: `Group ${i + 1}`,
      member: 3 + Math.round(Math.random() * 7),
      found: randomDate(),
      progress: 10 + Math.round(Math.random() * 90),
    })
  }

  return data
}

function randomDate() {
  const startDate = new Date('2000-01-01')
  const endDate = new Date()
  const randomDate = new Date(
    startDate.getTime() + (endDate.getTime() - startDate.getTime()) * Math.random(),
  )

  return formatDate(randomDate)
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function toggleChecked({ row, checked }: TableRowPayload) {
  console.info(row, checked)
}

function toggleAllChecked(checked: boolean) {
  console.info(checked)
}
</script>
