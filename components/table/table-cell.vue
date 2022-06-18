<template>
  <div v-if="isTypeColumn(column)" :class="className" :style="style">
    <Checkbox
      v-if="isSelection(column)"
      :class="nh.be('selection')"
      :checked="row.checked"
      :size="column.checkboxSize || 'default'"
      :disabled="disableCheckRows[row.key]"
      @click.prevent.stop="handleCheckRow(row)"
    ></Checkbox>
    <span v-else-if="isOrder(column)" :class="nh.be('order')">
      {{ column.orderLabel && column.orderLabel(column.truthIndex ? row.index : rowIndex) }}
    </span>
    <template v-else-if="isExpand(column)">
      <div
        v-if="!disableExpandRows[row.key]"
        :class="{
          [nh.be('expand')]: true,
          [nh.bem('expand', 'active')]: row.expanded
        }"
        @click.stop="handleExpandRow(row)"
      >
        <Icon><AngleRight></AngleRight></Icon>
      </div>
    </template>
  </div>
  <div v-else :class="className" :style="style">
    <Ellipsis v-if="!column.noEllipsis" :tooltip-theme="tooltipTheme" :tip-max-width="tooltipWidth">
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
    <template v-else>
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
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, toRef } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { AngleRight } from '@vexip-ui/icons'
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
    Renderer,
    AngleRight
  },
  props,
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableAction = inject<TableAction>(TABLE_ACTION)!

    const nh = useNameHelper('table')

    const className = computed(() => {
      const customClass = props.column.className || null

      return [
        nh.be('cell'),
        {
          [nh.bem('cell', 'center')]: columnTypes.includes((props.column as TypeColumn).type),
          [nh.bem('cell', 'wrap')]: props.column.noEllipsis
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
      nh,

      className,
      style,
      tooltipTheme: toRef(state, 'tooltipTheme'),
      tooltipWidth: toRef(state, 'tooltipWidth'),
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
