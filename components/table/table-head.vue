<template>
  <div :class="nh.be('head')" role="rowgroup" :style="style">
    <TableRow
      is-head
      :fixed="fixed"
      :row="headRow"
      aria-rowindex="0"
    >
      <TableHeadCell
        v-for="(column, index) in columns"
        :key="index"
        :column="column"
        :index="index"
        :fixed="fixed"
        :aria-colindex="index"
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
      type: String as PropType<'left' | 'right' | undefined>,
      default: null
    }
  },
  setup(props) {
    const { state, getters } = inject(TABLE_STORE)!

    const columns = computed(() => {
      return props.fixed === 'left'
        ? state.leftFixedColumns
        : props.fixed === 'right'
          ? state.rightFixedColumns
          : state.columns
    })
    const style = computed(() => {
      const width =
        props.fixed === 'left'
          ? getters.leftFixedWidths.at(-1)
          : props.fixed === 'right'
            ? getters.rightFixedWidths.at(-1)
            : getters.totalWidths.at(-1)
      const padLeft = props.fixed !== 'right' ? state.sidePadding[0] || 0 : 0
      const padRight = props.fixed !== 'left' ? state.sidePadding[1] || 0 : 0

      return {
        minWidth: width && `${width + padLeft + padRight}px`
      }
    })
    const headRow = computed(
      () => state.rowMap.get(TABLE_HEAD_KEY) || ({ key: TABLE_HEAD_KEY } as TableRowState)
    )

    return {
      nh: useNameHelper('table'),

      columns,
      style,
      headRow
    }
  }
})
</script>
