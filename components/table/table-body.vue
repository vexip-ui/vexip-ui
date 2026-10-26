<script setup lang="ts">
import { computed, inject, toRef } from 'vue'

import TableCell from './table-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { getLast } from '@vexip-ui/utils'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

defineOptions({ name: 'TableBody' })

const props = defineProps({
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null,
  },
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
const hasEmpty = computed(() => {
  if (state.rightFixedColumns.length) return props.fixed === 'right'
  if (state.leftFixedColumns.length) return props.fixed === 'left'
  return true
})
const style = computed(() => {
  const width =
    props.fixed === 'left'
      ? getLast(getters.leftFixedWidths)
      : props.fixed === 'right'
        ? getLast(getters.rightFixedWidths)
        : getLast(getters.normalWidths)
  const padLeft = columns.value[0]?.fixed === 'left' ? state.sidePadding[0] || 0 : 0
  const padRight = getLast(columns.value)?.fixed === 'right' ? state.sidePadding[1] || 0 : 0
  const showEmpty = hasEmpty.value && data.value.length === 0

  return {
    [nh.cv('right-fixed-width')]:
      props.fixed === 'right' && width ? `${width + padLeft + padRight}px` : '0px',
    [showEmpty ? 'width' : 'minWidth']: width && `${width + padLeft + padRight}px`,
    minHeight: `${state.totalHeight}px`,
  }
})
const emptyStyle = computed(() => {
  const { rowHeight, rowMinHeight } = state

  return {
    minHeight: `${rowHeight || rowMinHeight}px`,
  }
})
</script>

<template>
  <div :class="nh.be('body')" role="rowgroup" :style="style">
    <template v-if="data.length">
      <TableRow
        v-for="(row, index) in data"
        :key="index"
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
    <div
      v-else-if="hasEmpty"
      :class="[nh.be('empty'), fixed === 'right' && nh.bem('empty', 'right')]"
      :style="emptyStyle"
    >
      <slot name="empty">
        {{ locale.empty }}
      </slot>
    </div>
  </div>
</template>
