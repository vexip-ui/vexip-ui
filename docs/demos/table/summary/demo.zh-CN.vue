<template>
  <Table
    use-x-bar
    use-y-bar
    :data="data"
    :width="1000"
    :height="420"
    :side-padding="10"
  >
    <TableColumn
      id-key="name"
      name="名称"
      fixed
      text-align="center"
      :width="200"
    >
      <template #summary="{ summary }">
        {{ summary.name }}
      </template>
    </TableColumn>
    <TableColumn
      v-for="(month, index) in months"
      :key="month"
      :id-key="`m${index + 1}`"
      :name="month"
      text-align="center"
    ></TableColumn>
    <TableColumn
      id-key="year"
      name="年度"
      fixed="right"
      text-align="center"
      :accessor="sum"
    ></TableColumn>

    <TableSummary
      v-slot="{ meta }"
      id-key="sum"
      above
      name="合计值"
    >
      {{ meta.sum }}
    </TableSummary>
    <TableSummary
      v-slot="{ meta }"
      id-key="min"
      name="最小值/最大值"
      :cell-span="footCellSpan"
    >
      {{ meta.min }}
    </TableSummary>
    <TableSummary v-slot="{ meta }" id-key="max" name="Max">
      {{ meta.max }}
    </TableSummary>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const months = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
]
const random = () => Math.round(100 * Math.random())

const data = reactive(
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
      m12: random(),
    }
  }),
)

function sum(item: (typeof data)[0]) {
  let total = 0

  for (let i = 1; i < 13; ++i) {
    total += item[`m${i}` as Exclude<keyof typeof item, 'name' | 'index'>]
  }

  return total
}

function footCellSpan({ index }: { index: number }) {
  if (index === 0) {
    return { rowSpan: 2 }
  }
}
</script>
