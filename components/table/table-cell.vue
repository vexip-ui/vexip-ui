<script setup lang="ts">
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Renderer } from '@/components/renderer'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, inject, ref, toRef } from 'vue'

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

defineOptions({ name: 'TableCell' })

const props = defineProps({
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
  colIndex: {
    type: Number,
    default: -1
  },
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null
  }
})

const { state, getters, mutations } = inject(TABLE_STORE)!
const tableActions = inject(TABLE_ACTIONS)!

const nh = useNameHelper('table')
const icons = useIcons()
const { isRtl } = useRtl()

const wrapper = ref<HTMLElement>()

const disableCheckRows = toRef(getters, 'disableCheckRows')
const disableExpandRows = toRef(getters, 'disableExpandRows')
const disableDragRows = toRef(getters, 'disableDragRows')

const inLast = computed(() => {
  return props.column.index + cellSpan.value.colSpan >= state.columns.length
})
const className = computed(() => {
  let customClass = null

  if (typeof state.cellClass === 'function') {
    customClass = state.cellClass({
      row: props.row.data,
      rowIndex: props.rowIndex,
      column: props.column,
      columnIndex: props.column.index
    })
  } else {
    customClass = state.cellClass
  }

  const typed = columnTypes.includes((props.column as TableTypeColumn).type)

  return [
    nh.be('cell'),
    {
      [nh.bem('cell', 'typed')]: typed,
      [nh.bem('cell', 'center')]: typed || props.column.textAlign === 'center',
      [nh.bem('cell', 'right')]: props.column.textAlign === 'right',
      [nh.bem('cell', 'wrap')]: props.column.noEllipsis,
      [nh.bem('cell', 'last')]: inLast.value
    },
    props.column.class,
    customClass
  ]
})
const columns = computed(() => {
  return props.fixed === 'left'
    ? state.leftFixedColumns
    : props.fixed === 'right'
      ? state.rightFixedColumns
      : state.normalColumns
})
const cellSpan = computed(() => {
  const fixed = props.fixed || 'default'

  if (state.collapseMap.get(fixed)!.has(`${props.rowIndex},${props.column.index}`)) {
    return { colSpan: 0, rowSpan: 0 }
  }

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
      columnIndex: props.column.index,
      fixed: props.fixed
    })
  }

  const { colSpan, rowSpan } = result! || { colSpan: 1, rowSpan: 1 }
  const span = { colSpan: colSpan ?? 1, rowSpan: rowSpan ?? 1 }

  span.colSpan = boundRange(span.colSpan, 0, columns.value.length - props.colIndex)
  span.rowSpan = boundRange(span.rowSpan, 0, getters.processedData.length - props.rowIndex)

  mutations.updateCellSpan(props.rowIndex, props.column.index, fixed, span)

  return span
})
const customStyle = computed(() => {
  if (typeof state.cellStyle === 'function') {
    return state.cellStyle({
      row: props.row.data,
      rowIndex: props.rowIndex,
      column: props.column,
      columnIndex: props.column.index
    })
  }

  return state.cellStyle
})
const style = computed(() => {
  const totalWidths =
    props.fixed === 'left'
      ? getters.leftFixedWidths
      : props.fixed === 'right'
        ? getters.rightFixedWidths
        : getters.normalWidths
  const { colSpan, rowSpan } = cellSpan.value
  const noFixed = !getters.hasFixedColumn
  const padLeft = noFixed || columns.value[0]?.fixed === 'left' ? state.sidePadding[0] || 0 : 0
  const padRight =
    noFixed || columns.value.at(-1)?.fixed === 'right' ? state.sidePadding[1] || 0 : 0
  const width = totalWidths[props.colIndex + colSpan] - totalWidths[props.colIndex]

  let height: number | undefined

  if (rowSpan > 1 && state.heightBITree) {
    height =
      state.heightBITree.sum(props.row.listIndex + rowSpan) -
      state.heightBITree.sum(props.row.listIndex)
  }

  return [
    props.column.style || '',
    customStyle.value,
    {
      display: !colSpan || !rowSpan ? 'none' : undefined,
      width: `${(props.column.index ? 0 : padLeft) + (inLast.value ? padRight : 0) + width}px`,
      height: height ? `${height}px` : undefined,
      visibility: props.column.fixed && !props.fixed ? 'hidden' : undefined,
      borderRightWidth:
        !state.border && colSpan > 1 && props.colIndex + colSpan >= totalWidths.length - 1
          ? 0
          : undefined,
      borderBottomWidth:
        rowSpan > 1 && props.rowIndex + rowSpan >= getters.processedData.length ? 0 : undefined,
      transform: `translate3d(${isRtl.value ? '-' : ''}${
        (props.column.index ? padLeft : 0) + totalWidths[props.colIndex]
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
      columnIndex: props.colIndex
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
    columnIndex: props.colIndex,
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

function handleCellResize(entry: ResizeObserverEntry) {
  if (!wrapper.value) return

  const style = getComputedStyle(wrapper.value)
  const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)

  mutations.setCellHeight(
    props.row.key,
    props.column.key,
    (entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height) + borderHeight
  )
}
</script>

<template>
  <div
    v-bind="attrs"
    ref="wrapper"
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
    <div
      v-if="column.index === 0"
      :class="nh.be('side-pad')"
      role="none"
      aria-hidden
    ></div>
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
    <ResizeObserver v-else :disabled="!column.noEllipsis" :on-resize="handleCellResize">
      <span :class="nh.be('content')">
        <template
          v-if="
            getters.usingTree &&
              (getters.indentedColumn ? column.key === getters.indentedColumn.key : column.first)
          "
        >
          <span
            :class="nh.be('pad')"
            :style="{
              [nh.cv('row-depth')]: row.depth
            }"
          ></span>
          <button
            type="button"
            :class="[
              nh.be('tree-expand'),
              !row.children?.length && nh.bem('tree-expand', 'hidden')
            ]"
            @click="handleExpandTree(row)"
          >
            <TableIcon v-if="row.treeExpanded" name="minus" :origin="icons.minus"></TableIcon>
            <TableIcon v-else name="plus" :origin="icons.plus"></TableIcon>
          </button>
        </template>
        <Ellipsis
          v-if="!column.noEllipsis"
          inherit
          :class="nh.be('ellipsis')"
          :tooltip-theme="state.tooltipTheme"
          :tip-max-width="state.tooltipWidth"
        >
          <Renderer
            v-if="isFunction(column.renderer)"
            :renderer="column.renderer"
            :data="{ row: row.data, rowIndex, column, columnIndex: column.index }"
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
            :data="{ row: row.data, rowIndex, column, columnIndex: column.index }"
          ></Renderer>
          <template v-else-if="isFunction(column.accessor)">
            {{ column.accessor(row.data, rowIndex) }}
          </template>
          <template v-else>
            {{ row.data[column.key] }}
          </template>
        </template>
      </span>
    </ResizeObserver>
    <div
      v-if="inLast"
      :class="[nh.be('side-pad'), nh.bem('side-pad', 'right')]"
      role="none"
      aria-hidden
    ></div>
  </div>
</template>
