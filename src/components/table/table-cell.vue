<template>
  <div :class="className" :style="style">
    <checkbox
      v-if="column.type === TYPE_SELECTION"
      :class="`${prefix}__selection`"
      :checked="row.checked"
      :size="column.checkboxSize || 'default'"
      :disabled="disabledRows[row.key]"
      @click.native.prevent.stop="handleCheckRow(row)"
    ></checkbox>
    <template v-else-if="column.type === TYPE_ORDER">
      {{ column.orderLabel(column.truthIndex ? row.index : rowIndex) }}
    </template>
    <TableSlot
      v-else-if="column.slot"
      :row="row.data"
      :row-index="rowIndex"
      :column="column"
      :column-index="columnIndex"
      :height="row.height"
      :checked="row.checked"
    ></TableSlot>
    <Render
      v-else-if="isFunction(column.renderer)"
      :renderer="column.renderer"
      :data="{row: row.data, rowIndex, column, columnIndex}"
    ></Render>
    <template v-else-if="isFunction(column.accessor)">
      <!-- eslint-disable vue/no-v-html vue/valid-v-html -->
      <div
        v-if="column.parseHtml"
        v-html="column.accessor(row.data, rowIndex)"
      ></div>
      <template v-else>
        {{ column.accessor(row.data, rowIndex) }}
      </template>
    </template>
    <template v-else>
      {{ row.data[column.key] }}
    </template>
  </div>
</template>

<script>
import Checkbox from '../checkbox'
import Render from '../basis/render'
import TableSlot from './table-slot'
import {
  TYPE_ORDER,
  TYPE_SELECTION,
  mapState,
  mapGetters,
  mapActions
} from './store'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'TableCell',
  components: {
    Checkbox,
    Render,
    TableSlot
  },
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
  data() {
    return {
      prefix: `${prefix}-table`,
      TYPE_ORDER,
      TYPE_SELECTION
    }
  },
  computed: {
    ...mapState(['widths']),
    ...mapGetters(['disabledRows']),
    className() {
      const { prefix, column } = this
      const customClass = column.className || null

      return [
        `${prefix}__cell`,
        {
          [`${prefix}__cell--center`]: column.type === 'selection'
        },
        customClass
      ]
    },
    style() {
      const { widths, column } = this
      const width = widths[column.key]

      return {
        flex: `${width} 0 auto`,
        width: `${width}px`,
        maxWidth: `${column.width}px`
      }
    },
    disabled() {
      const { row, column } = this
      const { key, disabled } = column

      return key === 'selection' ? !!disabled(row.data) : false
    }
  },
  methods: {
    ...mapActions(['handleCheck']),
    isFunction(value) {
      return typeof value === 'function'
    },
    handleCheckRow(row) {
      if (!this.disabledRows[row.key]) {
        const checked = !row.checked

        this.handleCheck(row.key, checked)
        this.table.emitRowCheck(row.data, checked, row.key, row.index)
      }
    }
  }
}
</script>
