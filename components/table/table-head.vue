<template>
  <div :class="nh.be('head')" role="rowgroup" :style="style">
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
import { computed, defineComponent, inject } from 'vue'

import TableHeadCell from './table-head-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { TABLE_HEAD_KEY, TABLE_STORE } from './symbol'

import type { PropType } from 'vue'
import type { TableRowState } from './symbol'

export default defineComponent({
  name: 'TableHead',
  components: {
    TableHeadCell,
    TableRow
  },
  props: {
    fixed: {
      type: String as PropType<'left' | 'right'>,
      default: null,
      validator: (value: string) => {
        return value === 'left' || value === 'right'
      }
    }
  },
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
        const columnWidth = widths.get(key) || 0

        width += columnWidth
      }

      return {
        minWidth: `${width}px`
      }
    })
    const headRow = computed(
      () => state.rowMap.get(TABLE_HEAD_KEY) || ({ key: TABLE_HEAD_KEY } as TableRowState)
    )

    return {
      nh: useNameHelper('table'),

      currentColumns,
      style,
      headRow
    }
  }
})
</script>
