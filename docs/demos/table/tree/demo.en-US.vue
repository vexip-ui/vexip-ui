<template>
  <Table :data="data" :width="1000">
    <TableColumn id-key="selection" type="selection"></TableColumn>
    <TableColumn id-key="name" name="Name"></TableColumn>
    <TableColumn id-key="member" name="Member"></TableColumn>
    <TableColumn id-key="found" name="Found"></TableColumn>
    <TableColumn id-key="progress" name="Progress"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface RowData {
  id: number,
  name: string,
  member: number,
  found: string,
  progress: number,
  treeExpanded?: boolean,
  children?: RowData[]
}

const data = reactive(mockData())

data[0].children = mockData(5, 3)
data[0].treeExpanded = true
data[0].children[1].children = mockData(8, 2)

function mockData(idStart = 0, size = 5) {
  const data: RowData[] = []

  for (let i = 0; i < size; ++i) {
    data.push({
      id: idStart + i,
      name: `Name ${idStart + i + 1}`,
      member: 3 + Math.round(Math.random() * 7),
      found: randomDate(),
      progress: 10 + Math.round(Math.random() * 90)
    })
  }

  return data
}

function randomDate() {
  const startDate = new Date('2000-01-01')
  const endDate = new Date()
  const randomDate = new Date(
    startDate.getTime() + (endDate.getTime() - startDate.getTime()) * Math.random()
  )

  return formatDate(randomDate)
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}
</script>
