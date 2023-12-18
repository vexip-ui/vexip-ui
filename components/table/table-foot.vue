<script setup lang="ts">
import { computed, inject } from 'vue'

import TableFootCell from './table-foot-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { getLast } from '@vexip-ui/utils'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

defineOptions({ name: 'TableFoot' })

const props = defineProps({
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null
  },
  above: {
    type: Boolean,
    default: false
  }
})

const { state, getters, mutations } = inject(TABLE_STORE)!

const nh = useNameHelper('table')

const columns = computed(() => {
  return props.fixed === 'left'
    ? state.leftFixedColumns
    : props.fixed === 'right'
      ? state.rightFixedColumns
      : state.normalColumns
})
const summaries = computed(() => (props.above ? state.aboveSummaries : state.belowSummaries))
const summaryData = computed(() => {
  return summaries.value.map(summary => {
    const key = mutations.buildSummaryKey(summary.key)
    const row = state.rowMap.get(key) || mutations.createMinRowState(key)

    return { summary, row }
  })
})
const className = computed(() => {
  return [nh.be('foot'), nh.bem('foot', props.above ? 'above' : 'below')]
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

  return {
    minWidth: width && `${width + padLeft + padRight}px`
  }
})
</script>

<template>
  <div :class="className" role="rowgroup" :style="style">
    <TableRow
      v-for="({ row, summary }, index) in summaryData"
      :key="row.key"
      is-foot
      :fixed="fixed"
      :row="row"
      :aria-rowindex="index"
    >
      <TableFootCell
        v-for="(column, colIndex) in columns"
        :key="colIndex"
        :row="row"
        :column="column"
        :col-index="colIndex"
        :summary="summary"
        :summary-index="index"
        :fixed="fixed"
        :above="above"
        :aria-colindex="colIndex"
      ></TableFootCell>
    </TableRow>
  </div>
</template>
