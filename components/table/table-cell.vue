<template>
  <div :class="className" :style="style">
    <checkbox
      v-if="column.type === TYPE_SELECTION"
      :class="`${prefix}__selection`"
      :checked="row.checked"
      :size="column.checkboxSize || 'default'"
      :disabled="disableCheckRows[row.key]"
      @click.native.prevent.stop="handleCheckRow(row)"
    ></checkbox>
    <span v-else-if="column.type === TYPE_ORDER" :class="`${prefix}__order`">
      {{ column.orderLabel(column.truthIndex ? row.index : rowIndex) }}
    </span>
    <template v-else-if="column.type === TYPE_EXPAND">
      <div
        v-if="!disableExpandRows[row.key]"
        :class="{
          [`${prefix}__expand`]: true,
          [`${prefix}__expand--active`]: row.expanded
        }"
        @click.stop="handleExpandRow(row)"
      >
        <Icon name="angle-right"></Icon>
      </div>
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
      :data="{ row: row.data, rowIndex, column, columnIndex }"
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
import Icon from '../icon'
import Render from '../basis/render'
import TableSlot from './table-slot'
import { config } from '@/config/properties'
import {
  TYPE_ORDER,
  TYPE_SELECTION,
  TYPE_EXPAND,
  TYPE_COLUMNS,
  mapState,
  mapGetters,
  mapActions
} from './store'

import '../../icons/angle-right'

const prefix = config.defaults.prefixCls

export default {
  name: 'TableCell',
  components: {
    Checkbox,
    Icon,
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
      TYPE_SELECTION,
      TYPE_EXPAND
    }
  },
  computed: {
    ...mapState(['widths']),
    ...mapGetters(['disableCheckRows', 'disableExpandRows']),
    className() {
      const { prefix, column } = this
      const customClass = column.className || null

      return [
        `${prefix}__cell`,
        {
          [`${prefix}__cell--center`]: TYPE_COLUMNS.includes(column.type)
        },
        customClass
      ]
    },
    style() {
      const { widths, column } = this
      const width = widths[column.key]

      return {
        flex: `${width} 0 auto`,
        width: `${column.width ?? width}px`,
        maxWidth: `${column.width}px`
      }
    }
    // disabled() {
    //   const { row, column } = this
    //   const { key, disabled } = column

    //   return key === 'selection' ? !!disabled(row.data) : false
    // }
  },
  methods: {
    ...mapActions(['handleCheck', 'handleExpand']),
    isFunction(value) {
      return typeof value === 'function'
    },
    handleCheckRow(row) {
      if (!this.disableCheckRows[row.key]) {
        const checked = !row.checked

        this.handleCheck(row.key, checked)
        this.table.emitRowCheck(row.data, checked, row.key, row.index)
      }
    },
    handleExpandRow(row) {
      if (!this.disableExpandRows[row.key]) {
        const expanded = !row.expanded

        this.handleExpand(row.key, expanded)
        this.table.emitRowExpand(row.data, expanded, row.key, row.index)
      }
    }
  }
}
</script>
