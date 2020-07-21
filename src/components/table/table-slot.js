export default {
  name: 'TableSlot',
  functional: true,
  inject: ['table'],
  props: {
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    rowIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      default() {
        return {}
      }
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  render(h, context) {
    const { row, rowIndex, column, columnIndex } = context.props

    return h(
      'div',
      context.injections.table.$scopedSlots[column.slot]({
        row,
        rowIndex,
        column,
        columnIndex
      })
    )
  }
}
