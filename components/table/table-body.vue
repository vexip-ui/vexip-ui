<template>
  <div :class="nh.be('body')" role="rowgroup" :style="style">
    <template v-if="renderData.length">
      <TableRow
        v-for="row in renderData"
        :key="row.index"
        :row="row"
        :index="row.index"
        :fixed="fixed"
        :aria-rowindex="row.index"
      >
        <TableCell
          v-for="(column, columnIndex) in currentColumns"
          :key="columnIndex"
          :row="row"
          :row-index="row.listIndex"
          :column="column"
          :column-index="columnIndex"
          :fixed="fixed"
          :aria-colindex="columnIndex"
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

<script lang="ts">
import { computed, defineComponent, inject, toRef } from 'vue'

import TableCell from './table-cell.vue'
import TableRow from './table-row.vue'
import { useNameHelper } from '@vexip-ui/config'
import { TABLE_STORE } from './symbol'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'TableBody',
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
    const renderData = computed(() => (state.virtual ? state.virtualData : getters.processedData))
    const style = computed(() => {
      return {
        minWidth: `${
          props.fixed === 'left'
            ? getters.leftFixedWidths.at(-1)
            : props.fixed === 'right'
            ? getters.rightFixedWidths.at(-1)
            : getters.totalWidths.at(-1)
        }px`,
        minHeight: `${state.totalHeight}px`
      }
    })
    const listStyle = computed(() => {
      return {
        // transform: state.virtual ? `translate3d(0, ${state.padTop}px, 0)` : undefined
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
      locale: toRef(state, 'locale'),

      currentColumns,
      style,
      listStyle,
      emptyStyle,
      renderData
    }
  }
})
</script>
