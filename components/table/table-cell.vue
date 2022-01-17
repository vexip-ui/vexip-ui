<template>
  <div v-if="isTypeColumn(column)" :class="className" :style="style">
    <Checkbox
      v-if="isSelection(column)"
      :class="`${prefix}__selection`"
      :checked="row.checked"
      :size="column.checkboxSize || 'default'"
      :disabled="disableCheckRows[row.key]"
      @click.prevent.stop="handleCheckRow(row)"
    ></Checkbox>
    <span v-else-if="isOrder(column)" :class="`${prefix}__order`">
      {{ column.orderLabel && column.orderLabel(column.truthIndex ? row.index : rowIndex) }}
    </span>
    <template v-else-if="isExpand(column)">
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
  </div>
  <Ellipsis
    v-else
    :class="className"
    :tooltip-theme="tooltipTheme"
    :style="style"
  >
    <Renderer
      v-if="isFunction(column.renderer)"
      :renderer="column.renderer"
      :data="{ row: row.data, rowIndex, column, columnIndex }"
    ></Renderer>
    <template v-else-if="isFunction(column.accessor)">
      {{ column.accessor(row.data, rowIndex) }}
    </template>
    <template v-else>
      {{ row.data[column.key] }}
    </template>
  </Ellipsis>
</template>

<script lang="ts">
import { defineComponent, computed, inject, toRef } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { isFunction } from '@/common/utils/common'
import { TABLE_STORE, TABLE_ACTION } from './symbol'

import type { PropType } from 'vue'
import type {
  RowState,
  OrderColumn,
  SelectionColumn,
  ExpandColumn,
  TypeColumn,
  ColumnWithKey,
  TableAction
} from './symbol'

import '@/common/icons/angle-right'

const columnTypes = ['order', 'selection', 'expand']

const props = {
  row: {
    type: Object as PropType<RowState>,
    default: () => ({})
  },
  rowIndex: {
    type: Number,
    default: -1
  },
  column: {
    type: Object as PropType<ColumnWithKey>,
    default: () => ({})
  },
  columnIndex: {
    type: Number,
    default: -1
  }
}

export default defineComponent({
  name: 'TableCell',
  components: {
    Checkbox,
    Ellipsis,
    Icon,
    Renderer
  },
  props,
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableAction = inject<TableAction>(TABLE_ACTION)!

    const prefix = 'vxp-table'

    const className = computed(() => {
      const customClass = props.column.className || null

      return [
        `${prefix}__cell`,
        {
          [`${prefix}__cell--center`]: columnTypes.includes((props.column as TypeColumn).type)
        },
        customClass
      ]
    })
    const style = computed(() => {
      const width = state.widths[props.column.key]

      return {
        flex: `${width} 0 auto`,
        width: `${props.column.width ?? width}px`,
        maxWidth: `${props.column.width}px`
      }
    })

    function isSelection(column: unknown): column is SelectionColumn {
      return (column as TypeColumn).type === 'selection'
    }

    function isOrder(column: unknown): column is OrderColumn {
      return (column as TypeColumn).type === 'order'
    }

    function isExpand(column: unknown): column is ExpandColumn {
      return (column as TypeColumn).type === 'expand'
    }

    function isTypeColumn(column: unknown): column is TypeColumn {
      return isSelection(column) || isOrder(column) || isExpand(column)
    }

    function handleCheckRow(row: RowState) {
      if (!getters.disableCheckRows[row.key]) {
        const checked = !row.checked

        mutations.handleCheck(row.key, checked)
        tableAction.emitRowCheck(row.data, checked, row.key, row.index)
      }
    }

    function handleExpandRow(row: RowState) {
      if (!getters.disableExpandRows[row.key]) {
        const expanded = !row.expanded

        mutations.handleExpand(row.key, expanded)
        tableAction.emitRowExpand(row.data, expanded, row.key, row.index)
      }
    }

    return {
      prefix,

      className,
      style,
      tooltipTheme: toRef(state, 'tooltipTheme'),
      disableCheckRows: toRef(getters, 'disableCheckRows'),
      disableExpandRows: toRef(getters, 'disableExpandRows'),

      isFunction,
      isSelection,
      isOrder,
      isExpand,
      isTypeColumn,
      handleCheckRow,
      handleExpandRow
    }
  }
})
</script>
