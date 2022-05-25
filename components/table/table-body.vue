<template>
  <div :class="`${prefix}__body`" :style="style">
    <div v-if="renderData.length" :style="innerStyle">
      <TableRow
        v-for="row in renderData"
        :key="row.index"
        :row="row"
        :index="row.index"
        :is-fixed="!!fixed"
      >
        <TableCell
          v-for="(column, columnIndex) in currentColumns"
          :key="columnIndex"
          :row="row"
          :row-index="row.index"
          :column="column"
          :column-index="columnIndex"
        ></TableCell>
      </TableRow>
    </div>
    <slot v-else name="empty" :is-fixed="!!fixed">
      <div :class="`${prefix}__empty`" :style="emptyStyle">
        <template v-if="!fixed">
          {{ emptyText }}
        </template>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, toRef } from 'vue'
import TableCell from './table-cell.vue'
import TableRow from './table-row.vue'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

const props = {
  fixed: {
    type: String as PropType<'left' | 'right'>,
    default: null,
    validator: (value: string) => {
      return value === 'left' || value === 'right'
    }
  }
}

export default defineComponent({
  name: 'TableBody',
  components: {
    TableCell,
    TableRow
  },
  props,
  setup(props) {
    const { state, getters } = inject(TABLE_STORE)!

    const currentColumns = computed(() => {
      if (props.fixed === 'left') {
        return state.leftFixedColumns
      }

      if (props.fixed === 'right') {
        return state.rightFixedColumns
      }

      return state.columns
    })
    const renderData = computed(() => state.virtual ? state.virtualData : getters.processedData)
    const style = computed(() => {
      const { widths } = state
      const { totalRowHeight } = getters
      const columns = currentColumns.value

      let width = 0

      for (let i = 0, len = columns.length; i < len; i++) {
        const column = columns[i]
        const key = column.key
        const columnWidth = widths[key]

        width += columnWidth
      }

      return {
        minWidth: `${width}px`,
        minHeight: `${totalRowHeight}px`
      }
    })
    const innerStyle = computed(() => {
      return {
        transform: state.virtual ? `translate3d(0, ${state.padTop}px, 0)` : undefined
      }
    })
    const emptyStyle = computed(() => {
      const { rowHeight } = state

      return {
        height: rowHeight ? `${rowHeight}px` : undefined
      }
    })

    return {
      prefix: 'vxp-table',
      emptyText: toRef(state, 'emptyText'),

      currentColumns,
      style,
      innerStyle,
      emptyStyle,
      processedData: toRef(getters, 'processedData'),
      renderData
    }
  }
})
</script>
