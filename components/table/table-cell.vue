<template>
  <div
    v-bind="attrs"
    :class="className"
    role="cell"
    :scope="column.first ? 'row' : undefined"
    :colspan="cellSpan.colSpan !== 1 ? cellSpan.colSpan : undefined"
    :rowspan="cellSpan.rowSpan !== 1 ? cellSpan.rowSpan : undefined"
    :style="style"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
  >
    <template v-if="isTableTypeColumn(column)">
      <Checkbox
        v-if="isSelectionColumn(column)"
        inherit
        :class="nh.be('selection')"
        :checked="row.checked"
        :size="column.checkboxSize || 'default'"
        :disabled="disableCheckRows.has(row.key)"
        :partial="row.partial"
        :control="!!row.children?.length"
        @click.prevent.stop="handleCheckRow(row, $event)"
      ></Checkbox>
      <span v-else-if="isOrderColumn(column)" :class="nh.be('order')">
        {{ column.orderLabel && column.orderLabel(column.truthIndex ? row.index : rowIndex) }}
      </span>
      <template v-else-if="isExpandColumn(column)">
        <button
          v-if="!disableExpandRows.has(row.key)"
          type="button"
          :class="{
            [nh.be('expand')]: true,
            [nh.bem('expand', 'active')]: row.expanded
          }"
          @click.stop="handleExpandRow(row, $event)"
        >
          <TableIcon name="expand" :origin="icons.angleRight"></TableIcon>
        </button>
      </template>
      <template v-else-if="isDragColumn(column)">
        <button
          v-if="!disableDragRows.has(row.key)"
          type="button"
          :class="nh.be('dragger')"
          @mousedown="handleDragRow(row)"
        >
          <TableIcon name="dragger" :origin="icons.dragger"></TableIcon>
        </button>
      </template>
    </template>
    <template v-else>
      <template v-if="usingTree && column.first">
        <span
          :class="nh.be('pad')"
          :style="{
            [nh.cv('row-depth')]: row.depth
          }"
        ></span>
        <button
          type="button"
          :class="[nh.be('tree-expand'), !row.children?.length && nh.bem('tree-expand', 'hidden')]"
          @click="handleExpandTree(row)"
        >
          <TableIcon v-if="row.treeExpanded" name="minus" :origin="icons.minus"></TableIcon>
          <TableIcon v-else name="plus" :origin="icons.plus"></TableIcon>
        </button>
      </template>
      <Ellipsis
        v-if="!column.noEllipsis"
        inherit
        :tooltip-theme="tooltipTheme"
        :tip-max-width="tooltipWidth"
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
    </template>
  </div>
</template>

<script lang="ts">
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, inject, toRef } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import TableIcon from './table-icon.vue'
import { useRtl } from '@vexip-ui/hooks'
import { boundRange, isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_STORE, columnTypes } from './symbol'

import type { PropType } from 'vue'
import type {
  ColumnCellSpanFn,
  ColumnWithKey,
  TableDragColumn,
  TableExpandColumn,
  TableOrderColumn,
  TableRowState,
  TableSelectionColumn,
  TableTypeColumn
} from './symbol'

export default defineComponent({
  name: 'TableCell',
  components: {
    Checkbox,
    Ellipsis,
    Renderer,
    TableIcon
  },
  props: {
    row: {
      type: Object as PropType<TableRowState>,
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
    },
    fixed: {
      type: String as PropType<'left' | 'right' | undefined>,
      default: null
    }
  },
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableActions = inject(TABLE_ACTIONS)!

    const nh = useNameHelper('table')
    const { isRtl } = useRtl()
    const disableCheckRows = toRef(getters, 'disableCheckRows')
    const disableExpandRows = toRef(getters, 'disableExpandRows')
    const disableDragRows = toRef(getters, 'disableDragRows')

    const className = computed(() => {
      let customClass = null

      if (typeof state.cellClass === 'function') {
        customClass = state.cellClass({
          row: props.row.data,
          rowIndex: props.rowIndex,
          column: props.column,
          columnIndex: props.columnIndex
        })
      } else {
        customClass = state.cellClass
      }

      return [
        nh.be('cell'),
        {
          [nh.bem('cell', 'center')]:
            columnTypes.includes((props.column as TableTypeColumn).type) ||
            props.column.textAlign === 'center',
          [nh.bem('cell', 'right')]: props.column.textAlign === 'right',
          [nh.bem('cell', 'wrap')]: props.column.noEllipsis,
          [nh.bem('cell', 'last')]: props.column.last
        },
        props.column.class,
        customClass
      ]
    })
    const cellSpan = computed(() => {
      const fixed = props.fixed || 'default'

      if (state.collapseMap.get(fixed)!.has(`${props.rowIndex},${props.columnIndex}`)) {
        return { colSpan: 0, rowSpan: 0 }
      }

      const columns =
        fixed === 'left'
          ? state.leftFixedColumns
          : fixed === 'right'
            ? state.rightFixedColumns
            : state.columns

      let result: ReturnType<ColumnCellSpanFn>

      if (typeof props.column.cellSpan === 'function') {
        result = props.column.cellSpan({
          row: props.row.data,
          index: props.rowIndex,
          fixed: props.fixed
        })
      } else if (typeof state.cellSpan === 'function') {
        result = state.cellSpan({
          row: props.row.data,
          rowIndex: props.rowIndex,
          column: props.column,
          columnIndex: props.columnIndex,
          fixed: props.fixed
        })
      }

      const { colSpan, rowSpan } = result! || { colSpan: 1, rowSpan: 1 }
      const span = { colSpan: colSpan ?? 1, rowSpan: rowSpan ?? 1 }

      span.colSpan = boundRange(span.colSpan, 0, columns.length - props.columnIndex)
      span.rowSpan = boundRange(span.rowSpan, 0, getters.processedData.length - props.rowIndex)

      mutations.updateCellSpan(props.rowIndex, props.columnIndex, fixed, span)

      return span
    })
    const style = computed(() => {
      const totalWidths =
        props.fixed === 'left'
          ? getters.leftFixedWidths
          : props.fixed === 'right'
            ? getters.rightFixedWidths
            : getters.totalWidths
      const { colSpan, rowSpan } = cellSpan.value
      const width = totalWidths[props.columnIndex + colSpan] - totalWidths[props.columnIndex]
      const padLeft = props.fixed !== 'right' ? state.sidePadding[0] || 0 : 0

      let height: number | undefined

      if (rowSpan > 1 && state.heightBITree) {
        height =
          state.heightBITree.sum(props.row.listIndex + rowSpan) -
          state.heightBITree.sum(props.row.listIndex)
      }

      let customStyle

      if (typeof state.cellStyle === 'function') {
        customStyle = state.cellStyle({
          row: props.row.data,
          rowIndex: props.rowIndex,
          column: props.column,
          columnIndex: props.columnIndex
        })
      } else {
        customStyle = state.cellStyle
      }

      return [
        props.column.style || '',
        customStyle,
        {
          display: !colSpan || !rowSpan ? 'none' : undefined,
          width: `${width}px`,
          height: height ? `${height}px` : undefined,
          visibility: props.column.fixed && !props.fixed ? 'hidden' : undefined,
          borderRightWidth:
            !state.border && colSpan > 1 && props.columnIndex + colSpan >= totalWidths.length - 1
              ? 0
              : undefined,
          borderBottomWidth:
            rowSpan > 1 && props.rowIndex + rowSpan >= getters.processedData.length ? 0 : undefined,
          transform: `translate3d(${isRtl.value ? '-' : ''}${
            padLeft + totalWidths[props.columnIndex]
          }px, 0, 0)`
        }
      ]
    })
    const attrs = computed(() => {
      let customAttrs: Record<string, any>

      if (typeof state.cellAttrs === 'function') {
        customAttrs = state.cellAttrs({
          row: props.row.data,
          rowIndex: props.rowIndex,
          column: props.column,
          columnIndex: props.columnIndex
        })
      } else {
        customAttrs = state.cellAttrs
      }

      return { ...(props.column.attrs || {}), ...(customAttrs || {}) }
    })

    function isSelectionColumn(column: unknown): column is TableSelectionColumn {
      return (column as TableTypeColumn).type === 'selection'
    }

    function isOrderColumn(column: unknown): column is TableOrderColumn {
      return (column as TableTypeColumn).type === 'order'
    }

    function isExpandColumn(column: unknown): column is TableExpandColumn {
      return (column as TableTypeColumn).type === 'expand'
    }

    function isDragColumn(column: unknown): column is TableDragColumn {
      return (column as TableTypeColumn).type === 'drag'
    }

    function isTableTypeColumn(column: unknown): column is TableTypeColumn {
      return (
        isSelectionColumn(column) ||
        isOrderColumn(column) ||
        isExpandColumn(column) ||
        isDragColumn(column)
      )
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
      tableActions?.emitCellEvent('Enter', buildEventPayload(event))
    }

    function handleMouseLeave(event: MouseEvent) {
      tableActions?.emitCellEvent('Leave', buildEventPayload(event))
    }

    function handleClick(event: MouseEvent) {
      tableActions?.emitCellEvent('Click', buildEventPayload(event))
    }

    function handleDblclick(event: MouseEvent) {
      tableActions?.emitCellEvent('Dblclick', buildEventPayload(event))
    }

    function handleContextmenu(event: MouseEvent) {
      tableActions?.emitCellEvent('Contextmenu', buildEventPayload(event))
    }

    function handleCheckRow(row: TableRowState, event: MouseEvent) {
      if (!disableCheckRows.value.has(row.key)) {
        const checked = !row.checked
        const { data, key, index } = row

        mutations.handleCheck(key, checked)
        tableActions.emitRowCheck({ row: data, key, index, event, checked })
      }
    }

    function handleExpandRow(row: TableRowState, event: MouseEvent) {
      if (!disableExpandRows.value.has(row.key)) {
        const expanded = !row.expanded
        const { data, key, index } = row

        mutations.handleExpand(key, expanded)
        tableActions.emitRowExpand({ row: data, key, index, event, expanded })
      }
    }

    function handleDragRow(row: TableRowState) {
      if (!disableDragRows.value.has(row.key)) {
        mutations.handleDrag(row.key, true)
      }
    }

    function handleExpandTree(row: TableRowState) {
      if (!row.children?.length) return

      mutations.handleTreeExpand(row.key, !row.treeExpanded)
    }

    return {
      nh,
      icons: useIcons(),

      className,
      cellSpan,
      style,
      attrs,
      tooltipTheme: toRef(state, 'tooltipTheme'),
      tooltipWidth: toRef(state, 'tooltipWidth'),
      disableCheckRows,
      disableExpandRows,
      disableDragRows,
      usingTree: toRef(getters, 'usingTree'),

      isFunction,
      isSelectionColumn,
      isOrderColumn,
      isExpandColumn,
      isDragColumn,
      isTableTypeColumn,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleDblclick,
      handleContextmenu,
      handleCheckRow,
      handleExpandRow,
      handleDragRow,
      handleExpandTree
    }
  }
})
</script>
