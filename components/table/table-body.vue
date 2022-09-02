<template>
  <div :class="nh.be('body')" role="rowgroup" :style="style">
    <div v-if="renderData.length" :class="nh.be('row-list')" :style="listStyle">
      <TableRow
        v-for="(row, index) in renderData"
        :key="index"
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
    <div v-else :class="nh.be('empty')" :style="emptyStyle">
      <slot name="empty" :is-fixed="!!fixed">
        <template v-if="!fixed">
          {{ emptyText }}
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, toRef } from 'vue'
import TableCell from './table-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
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
    const renderData = computed(() => (state.virtual ? state.virtualData : getters.processedData))
    const style = computed(() => {
      const { widths, totalHeight } = state
      const columns = currentColumns.value

      let width = 0

      for (let i = 0, len = columns.length; i < len; ++i) {
        const column = columns[i]
        const key = column.key
        const columnWidth = widths[key]

        width += columnWidth
      }

      return {
        minWidth: `${width}px`,
        minHeight: `${totalHeight}px`
      }
    })
    const listStyle = computed(() => {
      return {
        transform: state.virtual ? `translate3d(0, ${state.padTop}px, 0)` : undefined
      }
    })
    const emptyStyle = computed(() => {
      const { rowHeight, rowMinHeight } = state

      return {
        minHeight: `${rowHeight || rowMinHeight}px`
      }
    })

    return {
      nh: useNameHelper('table'),
      emptyText: toRef(state, 'emptyText'),

      currentColumns,
      style,
      listStyle,
      emptyStyle,
      renderData
    }
  }
})
</script>
