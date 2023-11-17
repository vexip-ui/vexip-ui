<script setup lang="ts">
import { computed, inject, toRef } from 'vue'

import TableCell from './table-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

defineOptions({ name: 'TableBody' })

const props = defineProps({
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null
  }
})

const { state, getters } = inject(TABLE_STORE)!

const nh = useNameHelper('table')
const locale = toRef(state, 'locale')

const columns = computed(() => {
  return props.fixed === 'left'
    ? state.leftFixedColumns
    : props.fixed === 'right'
      ? state.rightFixedColumns
      : state.normalColumns
})
const data = computed(() => (state.virtual ? state.virtualData : getters.processedData))
const style = computed(() => {
  const width =
    props.fixed === 'left'
      ? getters.leftFixedWidths.at(-1)
      : props.fixed === 'right'
        ? getters.rightFixedWidths.at(-1)
        : getters.normalWidths.at(-1)
  const padLeft = props.fixed !== 'right' ? state.sidePadding[0] || 0 : 0
  const padRight = props.fixed !== 'left' ? state.sidePadding[1] || 0 : 0

  return {
    minWidth: width && `${width + padLeft + padRight}px`,
    minHeight: `${state.totalHeight}px`
  }
})
const emptyStyle = computed(() => {
  const { rowHeight, rowMinHeight } = state

  return {
    minHeight: `${rowHeight || rowMinHeight}px`
  }
})
</script>

<template>
  <div :class="nh.be('body')" role="rowgroup" :style="style">
    <template v-if="data.length">
      <TableRow
        v-for="row in data"
        :key="row.index"
        :row="row"
        :index="row.listIndex"
        :fixed="fixed"
        :aria-rowindex="row.index"
      >
        <TableCell
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          :row="row"
          :row-index="row.listIndex"
          :column="column"
          :col-index="colIndex"
          :fixed="fixed"
          :aria-colindex="colIndex"
        ></TableCell>
      </TableRow>
    </template>
    <div v-else :class="nh.be('empty')" :style="emptyStyle">
      <slot name="empty" :is-fixed="!!fixed">
        <template v-if="!fixed">
          {{ locale.empty }}
        </template>
      </slot>
    </div>
  </div>
</template>
