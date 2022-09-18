<template>
  <div
    v-if="isTypeColumn(column)"
    :class="className"
    role="cell"
    :style="style"
    v-bind="attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dbclick="handleDbclick"
    @contextmenu="handleContextmenu"
  >
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
  <div
    v-else
    :class="className"
    role="cell"
    :style="style"
    v-bind="attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dbclick="handleDbclick"
    @contextmenu="handleContextmenu"
  >
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
      let customClass = null

      if (typeof state.cellClass === 'function') {
        customClass = state.cellClass(
          props.row.data,
          props.column,
          props.rowIndex,
          props.columnIndex
        )
      } else {
        customClass = state.cellClass
      }

      return [
        nh.be('cell'),
        {
          [nh.bem('cell', 'center')]: columnTypes.includes((props.column as TypeColumn).type),
          [nh.bem('cell', 'wrap')]: props.column.noEllipsis
        },
        props.column.className || null,
        customClass
      ]
    })
    const style = computed(() => {
      const width = state.widths[props.column.key]

      let customStyle: any = ''

      if (typeof state.cellStyle === 'function') {
        customStyle = state.cellStyle(
          props.row.data,
          props.column,
          props.rowIndex,
          props.columnIndex
        )
      } else {
        customStyle = state.cellStyle
      }

      return [
        {
          flex: `${width} 0 auto`,
          width: `${props.column.width ?? width}px`,
          maxWidth: `${props.column.width}px`
        },
        props.column.style || '',
        customStyle
      ]
    })
    const attrs = computed(() => {
      let customAttrs: Record<string, any>

      if (typeof state.cellAttrs === 'function') {
        customAttrs = state.cellAttrs(
          props.row.data,
          props.column,
          props.rowIndex,
          props.columnIndex
        )
      } else {
        customAttrs = state.cellAttrs
      }

      return { ...(props.column.attrs || {}), ...(customAttrs || {}) }
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

    function buildEventPayload(event: Event) {
      return {
        row: props.row.data,
        key: props.row.key,
        rowIndex: props.rowIndex,
        column: props.column,
        columnIndex: props.columnIndex,
        event
      }
    }

    function handleMouseEnter(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellEnter(buildEventPayload(event))
      }
    }

    function handleMouseLeave(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellLeave(buildEventPayload(event))
      }
    }

    function handleClick(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellClick(buildEventPayload(event))
      }
    }

    function handleDbclick(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellDbclick(buildEventPayload(event))
      }
    }

    function handleContextmenu(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellContextmenu(buildEventPayload(event))
      }
    }

    function handleCheckRow(row: RowState) {
      if (!getters.disableCheckRows[row.key]) {
        const checked = !row.checked
        const { data, key, index } = row

        mutations.handleCheck(key, checked)
        tableAction.emitRowCheck({ row: data, key, index, checked })
      }
    }

    function handleExpandRow(row: RowState) {
      if (!getters.disableExpandRows[row.key]) {
        const expanded = !row.expanded
        const { data, key, index } = row

        mutations.handleExpand(key, expanded)
        tableAction.emitRowExpand({ row: data, key, index, expanded })
      }
    }

    return {
      nh,

      className,
      style,
      attrs,
      tooltipTheme: toRef(state, 'tooltipTheme'),
      tooltipWidth: toRef(state, 'tooltipWidth'),
      disableCheckRows: toRef(getters, 'disableCheckRows'),
      disableExpandRows: toRef(getters, 'disableExpandRows'),

      isFunction,
      isSelection,
      isOrder,
      isExpand,
      isTypeColumn,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleDbclick,
      handleContextmenu,
      handleCheckRow,
      handleExpandRow
    }
  }
})
</script>
