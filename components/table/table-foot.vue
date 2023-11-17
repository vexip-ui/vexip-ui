<template>
  <div :class="className" role="rowgroup" :style="style">
    <TableRow
      v-for="({ row, summary }, index) in data"
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

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import TableFootCell from './table-foot-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'
import type { TableRowState } from './symbol'

export default defineComponent({
  name: 'TableFoot',
  components: {
    TableFootCell,
    TableRow
  },
  props: {
    fixed: {
      type: String as PropType<'left' | 'right' | undefined>,
      default: null
    },
    above: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
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
    const data = computed(() => {
      return summaries.value.map(summary => {
        const key = mutations.buildSummaryKey(summary.key)
        const row = state.rowMap.get(key) || ({ key } as TableRowState)

        return { summary, row }
      })
    })
    const className = computed(() => {
      return [nh.be('foot'), nh.bem('foot', props.above ? 'above' : 'below')]
    })
    const style = computed(() => {
      return {
        minWidth: `${
          props.fixed === 'left'
            ? getters.leftFixedWidths.at(-1)
            : props.fixed === 'right'
            ? getters.rightFixedWidths.at(-1)
            : getters.normalWidths.at(-1)
        }px`
      }
    })

    return {
      nh,

      columns,
      summaries,
      data,
      className,
      style
    }
  }
})
</script>
