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
      ? getLast(getters.leftFixedWidths)
      : props.fixed === 'right'
        ? getLast(getters.rightFixedWidths)
        : getLast(getters.normalWidths)
  const padLeft = columns.value[0]?.fixed === 'left' ? state.sidePadding[0] || 0 : 0
  const padRight = getLast(columns.value)?.fixed === 'right' ? state.sidePadding[1] || 0 : 0

  return {
    [nh.cv('expanded-fix-width')]:
      props.fixed === 'right' && width ? `${width + padLeft + padRight}px` : '0px',
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
    <div v-else :class="nh.be('empty')" :style="emptyStyle">
      <slot name="empty" :is-fixed="!!fixed">
        <template v-if="!fixed">
          {{ locale.empty }}
        </template>
      </slot>
    </div>
  </div>
</template>
