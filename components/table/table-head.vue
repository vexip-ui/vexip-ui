<template>
  <div :class="`${prefix}__head`" :style="style">
    <TableRow is-head :row="headRow">
      <TableHeadCell
        v-for="(item, index) in currentColumns"
        :key="index"
        :column="item"
        :index="index"
      ></TableHeadCell>
    </TableRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import TableHeadCell from './table-head-cell.vue'
import TableRow from './table-row.vue'
import { TABLE_STORE, TABLE_HEAD_KEY } from './symbol'

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
  name: 'TableHead',
  components: {
    TableHeadCell,
    TableRow
  },
  props,
  setup(props) {
    const { state } = inject(TABLE_STORE)!

    const currentColumns = computed(() => {
      if (props.fixed === 'left') {
        return state.leftFixedColumns
      }

      if (props.fixed === 'right') {
        return state.rightFixedColumns
      }

      return state.columns
    })
    const style = computed(() => {
      const widths = state.widths
      const columns = currentColumns.value

      let width = 0

      for (let i = 0, len = columns.length; i < len; ++i) {
        const column = columns[i]
        const key = column.key
        const columnWidth = widths[key]

        width += columnWidth
      }

      return {
        minWidth: `${width}px`
      }
    })
    const headRow = computed(() => state.dataMap[TABLE_HEAD_KEY] || { key: TABLE_HEAD_KEY })

    return {
      prefix: 'vxp-table',

      currentColumns,
      style,
      headRow
    }
  }
})
</script>
