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
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
  >
    <Checkbox
      v-if="isSelection(column)"
      inherit
      :class="nh.be('selection')"
      :checked="row.checked"
      :size="column.checkboxSize || 'default'"
      :disabled="disableCheckRows.has(row.key)"
      :partial="row.partial"
      :control="!!row.children?.length"
      @click.prevent.stop="handleCheckRow(row, $event)"
    ></Checkbox>
    <span v-else-if="isOrder(column)" :class="nh.be('order')">
      {{ column.orderLabel && column.orderLabel(column.truthIndex ? row.index : rowIndex) }}
    </span>
    <template v-else-if="isExpand(column)">
      <button
        v-if="!disableExpandRows.has(row.key)"
        :class="{
          [nh.be('expand')]: true,
          [nh.bem('expand', 'active')]: row.expanded
        }"
        @click.stop="handleExpandRow(row, $event)"
      >
        <Icon><AngleRight></AngleRight></Icon>
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
        :class="[nh.be('tree-expand'), !row.children?.length && nh.bem('tree-expand', 'hidden')]"
        @click="handleExpandTree(row)"
      >
        <Icon>
          <Minus v-if="row.treeExpanded"></Minus>
          <Plus v-else></Plus>
        </Icon>
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
import { defineComponent, computed, inject, toRef } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { AngleRight, Plus, Minus } from '@vexip-ui/icons'
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

export default defineComponent({
  name: 'TableCell',
  components: {
    Checkbox,
    Ellipsis,
    Icon,
    Renderer,
    AngleRight,
    Plus,
    Minus
  },
  props: {
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
  },
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableAction = inject<TableAction>(TABLE_ACTION)!

    const nh = useNameHelper('table')
    const disableCheckRows = toRef(getters, 'disableCheckRows')
    const disableExpandRows = toRef(getters, 'disableExpandRows')

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
      const width = state.widths.get(props.column.key) || 0

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

    function handleDblclick(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellDblclick(buildEventPayload(event))
      }
    }

    function handleContextmenu(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitCellContextmenu(buildEventPayload(event))
      }
    }

    function handleCheckRow(row: RowState, event: MouseEvent) {
      if (!disableCheckRows.value.has(row.key)) {
        const checked = !row.checked
        const { data, key, index } = row

        mutations.handleCheck(key, checked)
        tableAction.emitRowCheck({ row: data, key, index, event, checked })
      }
    }

    function handleExpandRow(row: RowState, event: MouseEvent) {
      if (!disableExpandRows.value.has(row.key)) {
        const expanded = !row.expanded
        const { data, key, index } = row

        mutations.handleExpand(key, expanded)
        tableAction.emitRowExpand({ row: data, key, index, event, expanded })
      }
    }

    function handleExpandTree(row: RowState) {
      if (!row.children?.length) return

      const expanded = !row.treeExpanded

      mutations.handleTreeExpand(row.key, expanded)
    }

    return {
      nh,

      className,
      style,
      attrs,
      tooltipTheme: toRef(state, 'tooltipTheme'),
      tooltipWidth: toRef(state, 'tooltipWidth'),
      disableCheckRows,
      disableExpandRows,
      usingTree: toRef(getters, 'usingTree'),

      isFunction,
      isSelection,
      isOrder,
      isExpand,
      isTypeColumn,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleDblclick,
      handleContextmenu,
      handleCheckRow,
      handleExpandRow,
      handleExpandTree
    }
  }
})
</script>
