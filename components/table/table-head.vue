<script setup lang="ts">
import { computed, inject } from 'vue'

import TableHeadCell from './table-head-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { TABLE_HEAD_PREFIX, TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

defineOptions({ name: 'TableHead' })

const props = defineProps({
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null
  }
})

const { state, getters, mutations } = inject(TABLE_STORE)!

const nh = useNameHelper('table')
const allColumns = computed(() => {
  const left = state.leftFixedColumns.length
  const right = state.allColumns[0].length - state.rightFixedColumns.length

  if (props.fixed === 'left') {
    return state.allColumns.map(columns => columns.slice(0, left))
  } else if (props.fixed === 'right') {
    return state.allColumns.map(columns => columns.slice(right, state.allColumns[0].length))
  }

  return state.allColumns.map(columns => columns.slice(left, right))
})
const columns = computed(() => {
  return props.fixed === 'left'
    ? state.leftFixedColumns
    : props.fixed === 'right'
      ? state.rightFixedColumns
      : state.normalColumns
})
const style = computed(() => {
  const width =
    props.fixed === 'left'
      ? getters.leftFixedWidths.at(-1)
      : props.fixed === 'right'
        ? getters.rightFixedWidths.at(-1)
        : getters.normalWidths.at(-1)
  const padLeft = columns.value[0]?.fixed === 'left' ? state.sidePadding[0] || 0 : 0
  const padRight = columns.value.at(-1)?.fixed === 'right' ? state.sidePadding[1] || 0 : 0

  return {
    minWidth: width && `${width + padLeft + padRight}px`
  }
})

function getRow(index: number) {
  const key = `${TABLE_HEAD_PREFIX}${index}`

  return state.rowMap.get(key) || mutations.createMinRowState(key)
}
</script>

<template>
  <div :class="nh.be('head')" role="rowgroup" :style="style">
    <TableRow
      v-for="(rowColumns, rowIndex) in allColumns"
      :key="rowIndex"
      :index="rowIndex"
      is-head
      :fixed="fixed"
      :row="getRow(rowIndex)"
      :aria-rowindex="rowIndex"
    >
      <template v-for="(column, index) in rowColumns as any" :key="index">
        <TableHeadCell
          v-if="column"
          :column="column"
          :index="index"
          :row="getRow(rowIndex)"
          :row-index="rowIndex"
          :fixed="fixed"
          :aria-colindex="index"
        ></TableHeadCell>
      </template>
    </TableRow>
  </div>
</template>
