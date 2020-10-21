<template>
  <div :class="`${prefix}__head`" :style="style">
    <TableRow is-head>
      <TableHeadCell
        v-for="(item, index) in currentColumns"
        :key="index"
        :column="item"
        :index="index"
      ></TableHeadCell>
    </TableRow>
  </div>
</template>

<script>
import TableHeadCell from './table-head-cell'
import TableRow from './table-row'
import { mapState } from './store'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'TableHead',
  components: {
    TableHeadCell,
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
    ...mapState(['columns', 'widths', 'leftFixedColumns', 'rightFixedColumns']),
    currentColumns() {
      if (this.fixed === 'left') {
        return this.leftFixedColumns
      }

      if (this.fixed === 'right') {
        return this.rightFixedColumns
      }

      return this.columns
    },
    style() {
      const { currentColumns, widths } = this

      let width = 0

      for (let i = 0, len = currentColumns.length; i < len; i++) {
        const column = currentColumns[i]
        const key = column.key
        const columnWidth = widths[key]

        width += columnWidth
      }

      return {
        minWidth: `${width}px`
      }
    }
  },
  methods: {}
}
</script>
