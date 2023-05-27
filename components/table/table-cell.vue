<template>
  <div
    v-if="isTableTypeColumn(column)"
    :class="className"
    role="cell"
    :style="style"
    v-bind="attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
  >
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
        <Icon v-bind="icons.angleRight"></Icon>
      </button>
    </template>
    <template v-else-if="isDragColumn(column)">
      <button
        v-if="!disableDragRows.has(row.key)"
        type="button"
        :class="nh.be('dragger')"
        @mousedown="handleDragRow(row)"
      >
        <Icon v-bind="icons.dragger"></Icon>
      </button>
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
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
  >
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
        <Icon v-if="row.treeExpanded" v-bind="icons.minus"></Icon>
        <Icon v-else v-bind="icons.plus"></Icon>
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
  </div>
</template>

<script lang="ts">
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, inject, toRef } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_STORE, columnTypes } from './symbol'

import type { PropType } from 'vue'
import type {
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
    Icon,
    Renderer
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
    }
  },
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableActions = inject(TABLE_ACTIONS)!

    const nh = useNameHelper('table')
    const disableCheckRows = toRef(getters, 'disableCheckRows')
    const disableExpandRows = toRef(getters, 'disableExpandRows')
    const disableDragRows = toRef(getters, 'disableDragRows')

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
          [nh.bem('cell', 'center')]:
            columnTypes.includes((props.column as TableTypeColumn).type) ||
            props.column.textAlign === 'center',
          [nh.bem('cell', 'right')]: props.column.textAlign === 'right',
          [nh.bem('cell', 'wrap')]: props.column.noEllipsis
        },
        props.column.className || null,
        props.column.class || null,
        customClass
      ]
    })
    const style = computed(() => {
      const width = state.widths.get(props.column.key) || 0
      const maxWidth = state.resized.has(props.column.key)
        ? `${width}px`
        : `${props.column.width}px`

      let customStyle

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
          maxWidth,
          flex: `${width} 0 auto`,
          width: `${props.column.width ?? width}px`
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

      const expanded = !row.treeExpanded

      mutations.handleTreeExpand(row.key, expanded)
    }

    return {
      nh,
      icons: useIcons(),

      className,
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
