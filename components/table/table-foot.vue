<template>
  <div :class="nh.be('foot')" role="rowgroup">
    <TableRow>
      <TableCell></TableCell>
    </TableRow>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import TableCell from './table-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'TableFoot',
  components: {
    TableCell,
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

    const currentColumns = computed(() => {
      return props.fixed === 'left'
        ? state.leftFixedColumns
        : props.fixed === 'right'
          ? state.rightFixedColumns
          : state.columns
    })
    const style = computed(() => {
      return {
        minWidth: `${
          props.fixed === 'left'
            ? getters.leftFixedWidths.at(-1)
            : props.fixed === 'right'
            ? getters.rightFixedWidths.at(-1)
            : getters.totalWidths.at(-1)
        }px`
      }
    })

    return {
      nh: useNameHelper('table'),

      currentColumns,
      style
    }
  }
})
</script>
