<template>
  <div :class="`${prefix}__body`" :style="style">
    <TableRow
      v-for="(row, rowIndex) in processedData"
      :key="rowIndex"
      :row="row"
      :index="rowIndex"
      :is-fixed="!!fixed"
    >
      <TableCell
        v-for="(column, columnIndex) in currentColumns"
        :key="columnIndex"
        :row="row"
        :row-index="rowIndex"
        :column="column"
        :column-index="columnIndex"
      ></TableCell>
    </TableRow>
  </div>
</template>

<script>
/* eslint-disable */
import TableCell from './table-cell'
import TableRow from './table-row'
import { mapState, mapGetters } from './store'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'TableBody',
  components: {
    TableCell,
    TableRow
  },
  inject: ['table'],
  props: {
    fixed: {
      default: null,
      validator(value) {
        return value === 'left' || value === 'right'
      }
    }
  },
  data() {
    return {
      prefix: `${prefix}-table`
    }
  },
  computed: {
    ...mapState([
      'columns',
      'widths',
      'leftFixedColumns',
      'rightFixedColumns',
      'hiddenHeight'
    ]),
    ...mapGetters(['processedData', 'totalRowHeight']),
    currentColumns() {
      if (this.fixed === 'left') {
        return this.leftFixedColumns
      }

      if (this.fixed === 'right') {
        return this.rightFixedColumns
      }

      // return this.columns
      return this.table.store.state.columns
    },
    style() {
      const { currentColumns, widths, hiddenHeight } = this

      let width = 0

      for (let i = 0, len = currentColumns.length; i < len; i++) {
        const column = currentColumns[i]
        const key = column.key
        const columnWidth = widths[key]

        width += columnWidth
      }

      return {
        minWidth: `${width}px`,
        // minHeight: `${totalRowHeight}px`,
        paddingTop: `${hiddenHeight}px`
      }
    }
  },
  methods: {
    hasAccessor(column) {
      return typeof column.accessor === 'function'
    }
  }
}
</script>
