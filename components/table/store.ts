import { useCascadedChecked } from '@/components/tree/hooks'

import { computed, reactive, watchEffect } from 'vue'

import {
  boundRange,
  createBITree,
  debounceMinor,
  deepClone,
  getLast,
  isNull,
  mapTree,
  sortByProps,
  toFalse,
  toFixed,
  toNumber,
  walkTree,
} from '@vexip-ui/utils'
import { DEFAULT_KEY_FIELD, TABLE_FOOT_PREFIX, TABLE_HEAD_PREFIX, columnTypes } from './symbol'

import type { ClassType, LocaleConfig, StyleType } from '@vexip-ui/config'
import type { TooltipTheme } from '@/components/tooltip'
import type {
  CellSpanResult,
  ColumnCellSpanFn,
  ColumnGroupWithKey,
  ColumnRawWithKey,
  ColumnWithKey,
  Data,
  ExpandRenderFn,
  Key,
  ParsedFilterOptions,
  ParsedTableSorterOptions,
  StoreOptions,
  StoreState,
  SummaryCellSpanFn,
  SummaryWithKey,
  TableCellPropFn,
  TableCellSpanFn,
  TableColResizeType,
  TableColumnOptions,
  TableColumnRawOptions,
  TableColumnType,
  TableDragColumn,
  TableExpandColumn,
  TableFilterOptions,
  TableFootPropFn,
  TableHeadPropFn,
  TableKeyConfig,
  TableRowPropFn,
  TableRowState,
  TableSelectionColumn,
  TableSorterOptions,
  TableSummaryData,
  TableSummaryOptions,
} from './symbol'

const defaultSummaryData = Object.freeze<TableSummaryData>({
  sum: NaN,
  min: NaN,
  max: NaN,
})

let indexId = 1

function getIndexId() {
  return `__vxp-table-key-${indexId++}`
}

function defaultIndexLabel(index: number) {
  return index + 1
}

const COLUMN_DEFAULT_WIDTH = 100
const COLUMN_DEFAULT_MIN_WIDTH = 100

export function useStore(options: StoreOptions) {
  const state = reactive({
    ...options,
    columns: [],
    normalColumns: [],
    allColumns: [],
    summaries: [],
    data: [],
    dataKey: options.dataKey ?? DEFAULT_KEY_FIELD,
    rowData: [],
    treeRowData: [],
    width: 0,
    rightFixedColumns: [],
    leftFixedColumns: [],
    aboveSummaries: [],
    belowSummaries: [],
    rowMinHeight: options.rowMinHeight || 36,
    rowDraggable: !!options.rowDraggable,
    columnMap: new Map(),
    rowMap: new Map(),
    summaryMap: new Map(),
    idMaps: new WeakMap(),
    checkedAll: false,
    partial: false,
    widths: new Map(),
    sorters: new Map(),
    filters: new Map(),
    resized: new Set(),
    bodyYScroll: 0,
    bodyXScroll: 0,
    padTop: 0,
    startRow: 0,
    endRow: 0,
    dragging: false,
    heightBITree: null!,
    virtualData: [],
    totalHeight: options.rowMinHeight * options.data.length,
    colResizing: false,
    resizeLeft: 0,
    cellSpanMap: new Map(),
    collapseMap: new Map(),
    sidePadding: options.sidePadding || [0, 0],
    locked: false,
    barScrolling: false,
    heightTrigger: 0,
  }) as StoreState

  setColumns(options.columns)
  setSummaries(options.summaries)
  setData(options.data)

  const userData = computed(() => {
    return typeof state.dataFilter === 'function'
      ? state.rowData.filter(row => state.dataFilter(row.data))
      : state.rowData
  })
  const filteredData = computed(() => {
    return state.customFilter
      ? userData.value
      : filterData(state.filters, userData.value, state.singleFilter)
  })
  const sortedData = computed(() => {
    const data = state.customSorter
      ? filteredData.value
      : sortData(state.sorters, filteredData.value, state.columns, state.singleSorter)

    return data
  })
  const processedData = computed(() => {
    const data = pageData(state.currentPage, state.pageSize, sortedData.value)

    for (let i = 0, len = data.length; i < len; ++i) {
      data[i].listIndex = i
      data[i].last = i === len - 1
    }

    return data
  })
  const visibleKeys = computed(() => new Set(processedData.value.map(row => row.key)))
  const disableCheckRows = computed(() => {
    const rowData = processedData.value
    const selectionColumn = state.columns.find(
      item => (item as TableSelectionColumn).type === 'selection',
    ) as TableSelectionColumn | undefined
    const disableCheckRows = new Set<Key>()

    if (selectionColumn && typeof selectionColumn.disableRow === 'function') {
      const isDisabled = selectionColumn.disableRow

      for (let i = 0, len = rowData.length; i < len; ++i) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          disableCheckRows.add(row.key)
        }
      }
    }

    return disableCheckRows
  })
  const disableExpandRows = computed(() => {
    const rowData = processedData.value
    const expandColumn = state.columns.find(
      item => (item as TableExpandColumn).type === 'expand',
    ) as TableExpandColumn | undefined
    const disableExpandRows = new Set<Key>()

    if (expandColumn && typeof expandColumn.disableRow === 'function') {
      const isDisabled = expandColumn.disableRow

      for (let i = 0, len = rowData.length; i < len; ++i) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          disableExpandRows.add(row.key)
        }
      }
    }

    return disableExpandRows
  })
  const disableDragRows = computed(() => {
    const rowData = processedData.value
    const dragColumn = state.columns.find(item => (item as TableDragColumn).type === 'drag') as
      | TableDragColumn
      | undefined
    const disableDragRows = new Set<Key>()

    if (dragColumn && typeof dragColumn.disableRow === 'function') {
      const isDisabled = dragColumn.disableRow

      for (let i = 0, len = rowData.length; i < len; ++i) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          disableDragRows.add(row.key)
        }
      }
    }

    return disableDragRows
  })
  const usingTree = computed(() => {
    return !state.disabledTree && state.rowData.some(row => row.children?.length)
  })
  const hasDragColumn = computed(() => {
    return !!state.columns.find(column => 'type' in column && column.type === 'drag')
  })
  const rowDragging = computed(() => !!processedData.value.find(row => row.dragging))
  const totalWidths = computed(() => getColumnsWidths())
  const normalWidths = computed(() => getColumnsWidths(state.normalColumns))
  const leftFixedWidths = computed(() => getColumnsWidths(state.leftFixedColumns))
  const rightFixedWidths = computed(() => getColumnsWidths(state.rightFixedColumns))
  const expandColumn = computed(() => {
    return state.columns.find(column => (column as TableExpandColumn).type === 'expand') as
      | TableExpandColumn
      | undefined
  })
  const summaryData = computed(() => {
    const { columns, summaries, data } = state
    const map = new Map<Key, TableSummaryData>()

    if (!summaries.length) return map

    for (const column of columns) {
      const key = column.key

      if (column.type || column.noSummary) {
        map.set(key, defaultSummaryData)
        continue
      }

      const accessor =
        typeof column.accessor === 'function' ? column.accessor : (data: Data) => data[key]

      let sum = 0
      let min = Infinity
      let max = -Infinity
      let valid = false

      for (let i = 0, len = data.length; i < len; ++i) {
        const value = accessor(data[i], i)
        const number = parseFloat(value as string)

        if (Number.isNaN(number)) continue

        sum += number
        min = Math.min(min, number)
        max = Math.max(max, number)
        valid = true
      }

      valid ? map.set(key, { sum, min, max }) : map.set(key, defaultSummaryData)
    }

    return map
  })
  const topFixedHeights = computed(() => getSummariesHeights(state.aboveSummaries))
  const bottomFixedHeights = computed(() => getSummariesHeights())
  const indentedColumn = computed(() => {
    return state.columns.find(column => !column.type && column.indented)
  })
  const hasFixedColumn = computed(() => {
    return !!(state.leftFixedColumns.length || state.rightFixedColumns.length)
  })

  const getters = reactive({
    filteredData,
    sortedData,
    processedData,
    visibleKeys,
    disableCheckRows,
    disableExpandRows,
    disableDragRows,
    usingTree,
    hasDragColumn,
    rowDragging,
    totalWidths,
    normalWidths,
    leftFixedWidths,
    rightFixedWidths,
    expandColumn,
    summaryData,
    topFixedHeights,
    bottomFixedHeights,
    indentedColumn,
    hasFixedColumn,
  })

  const mutations = {
    // 这几个个方法被 deep watch 回调
    // 需要防止在一个微任务内被多次调用
    setColumns: debounceMinor(setColumns),
    // setColumns,
    setSummaries: debounceMinor(setSummaries),
    setData: debounceMinor(setData),

    // 这个方法被大量的 watch 回调，需要防抖
    updateTotalHeight: debounceMinor(updateTotalHeight),

    isGroupColumn,
    buildSummaryKey,
    setColumnProp,
    setSummaryProp,
    setDataKey,
    setCurrentPage,
    setPageSize,
    setRowClass,
    setRowStyle,
    setRowAttrs,
    setCellClass,
    setCellStyle,
    setCellAttrs,
    setHeadClass,
    setHeadStyle,
    setHeadAttrs,
    setFootClass,
    setFootStyle,
    setFootAttrs,
    setTableWidth,
    setRowHeight,
    setRowMinHeight,
    setCellHeight,
    setVirtual,
    setRowDraggable,
    setBodyYScroll,
    setBodyXScroll,
    setBorder,
    setStripe,
    setHighlight,
    setRowProp,
    setLocale,
    setTooltipTheme,
    setTooltipWidth,
    setSingleSorter,
    setSingleFilter,
    setDragging,
    setKeyConfig,
    setDisabledTree,
    setNoCascaded,
    setColResizable,
    setCustomSorter,
    setCustomFilter,
    setColumnResizing,
    setResizeLeft,
    setExpandRenderer,
    setCellSpan,
    setSidePadding,
    setBorderWidth,
    setDataFilter,
    setEllipsis,
    setLocked,
    setBarScrolling,

    handleSort,
    clearSort,
    handleFilter,
    clearFilter,
    toggleFilterItemActive,
    refreshRowIndex,
    handleCheck,
    handleCheckAll,
    clearCheckAll,
    setRenderRows,
    handleExpand,
    handleDrag,
    collectUnderRows,
    setTreeExpanded,
    getParentRow,
    handleColumnResize,
    getCurrentData,
    createMinRowState,
    flatTreeRows,
    refreshRowDepth,
    triggerHeightChange,
    queryRow,
  }

  watchEffect(() => {
    state.heightBITree = createBITree(
      processedData.value.length,
      state.rowHeight || state.rowMinHeight,
    )

    state.totalHeight = -1
    updateTotalHeight()
  })
  watchEffect(computeCellSpan)

  function triggerHeightChange() {
    ++state.heightTrigger

    if (state.heightTrigger >= Number.MAX_SAFE_INTEGER) {
      state.heightTrigger = 0
    }
  }

  function getColumnsWidths(columns = state.columns) {
    const widths = state.widths
    const combinedWidths: number[] = [0]

    let width = 0

    for (let i = 0, len = columns.length; i < len; ++i) {
      const column = columns[i]
      const key = column.key
      const columnWidth = widths.get(key) || 0

      width += columnWidth
      combinedWidths.push(width)
    }

    return combinedWidths
  }

  function getSummariesHeights(summaries = state.belowSummaries) {
    const rowMap = state.rowMap
    const heights: number[] = [0]

    let height = 0

    for (let i = 0, len = summaries.length; i < len; ++i) {
      const summary = summaries[i]
      const key = buildSummaryKey(summary.key)
      const row = rowMap.get(key)

      if (row) {
        height += row.height || 0
      }

      heights.push(height)
    }

    return heights
  }

  function createMinRowState(key: Key) {
    return { key, cellHeights: {}, height: state.rowHeight ?? state.rowMinHeight } as TableRowState
  }

  function isGroupColumn(column: any): column is ColumnGroupWithKey {
    return !!column.children?.length
  }

  function buildColumns(columns: TableColumnRawOptions[]) {
    const allColumns: ColumnRawWithKey[][] = []
    const baseColumns: ColumnWithKey[] = []
    const columnMap = new Map<Key, ColumnRawWithKey>()
    const existedTypes = new Set<TableColumnType>()

    const getFixedOrder = (fixed?: boolean | 'left' | 'right') => {
      return fixed === true || fixed === 'left' ? -1 : fixed === 'right' ? 1 : 0
    }
    const build = (
      _columns: TableColumnRawOptions[],
      fixed?: boolean | 'left' | 'right',
      row = 0,
      result: ColumnRawWithKey[][] = [],
    ) => {
      _columns = _columns
        .filter(column => !('children' in column) || isGroupColumn(column))
        .sort((prev, next) => (prev.order || 0) - (next.order || 0))
        .sort((prev, next) => getFixedOrder(prev.fixed) - getFixedOrder(next.fixed))
      fixed = fixed === true ? 'left' : fixed

      const columns = _columns as ColumnRawWithKey[]
      const rowColumns = result[row] ?? (result[row] = [])

      let index = row > 0 ? result[row - 1].length - 1 : 0

      for (const { ...column } of columns) {
        if (!isNull(fixed)) {
          column.fixed = fixed
        }

        rowColumns[index] = column

        if (isGroupColumn(column)) {
          const endIndex = build(column.children, column.fixed, row + 1, result)

          column.key = Symbol('TableColumnGroup')
          column.headSpan = endIndex - index
          index = endIndex
        } else {
          const validType = column.type && columnTypes.includes(column.type)

          if (validType) {
            if (existedTypes.has(column.type)) {
              console.warn(`[vexip-ui:Table] Table has duplicate column with type '${column.type}'`)
            }

            existedTypes.add(column.type)
          }

          let key = column.key

          if (isNull(key)) {
            if (validType) {
              key = `__vxp_${column.type}`
            } else {
              console.warn('[vexip-ui:Table] Table column requires key prop, but missing')

              key = getIndexId()
            }
          }

          column.key = key
          baseColumns.push(column)
          index += 1
        }

        columnMap.set(column.key, column)
      }

      return index
    }

    build(columns, undefined, 0, allColumns)

    let length = 0

    for (const rowColumns of allColumns) {
      length = Math.max(rowColumns.length, length)
    }

    for (const rowColumns of allColumns) {
      if (rowColumns.length) {
        getLast(rowColumns)!.last = true
      }

      rowColumns.length = length
    }

    for (let i = 0, rowCount = allColumns.length; i < length; ++i) {
      let span = 1

      for (let j = rowCount - 1; j >= 0; --j) {
        const column = allColumns[j][i]

        if (column) {
          column.colIndex = i
          column.rowSpan = span
          span = 1
        } else {
          ++span
        }
      }
    }

    return { allColumns, baseColumns, columnMap }
  }

  function setColumns(columns: TableColumnRawOptions[]) {
    const { widths, sorters, filters } = state
    const { allColumns, baseColumns, columnMap } = buildColumns(columns)

    const normalColumns: ColumnWithKey[] = []
    const rightFixedColumns: ColumnWithKey[] = []
    const leftFixedColumns: ColumnWithKey[] = []

    for (let i = 0, len = baseColumns.length; i < len; ++i) {
      const column = baseColumns[i]

      column.first = false
      column.last = false
      column.index = i

      if (column.type && columnTypes.includes(column.type)) {
        switch (column.type) {
          case 'order': {
            column.truthIndex = !!column.truthIndex

            if (typeof column.orderLabel !== 'function') {
              column.orderLabel = defaultIndexLabel
            }

            if (isNull(column.width)) {
              column.width = 60
              column.minWidth = 60
            }

            break
          }
          case 'selection': {
            column.selectionSize = column.selectionSize || 'default'

            if (typeof column.disableRow !== 'function') {
              column.disableRow = toFalse
            }

            if (isNull(column.width)) {
              column.width = 40
              column.minWidth = 40
            }

            break
          }
          case 'expand': {
            if (typeof column.disableRow !== 'function') {
              column.disableRow = toFalse
            }

            if (isNull(column.width)) {
              column.width = 40
              column.minWidth = 40
            }

            break
          }
          case 'drag': {
            if (typeof column.disableRow !== 'function') {
              column.disableRow = toFalse
            }

            if (isNull(column.width)) {
              column.width = 40
              column.minWidth = 40
            }

            break
          }
        }

        if (!column.key) {
          column.key = `__vxp_${column.type}-${i}`
        }
      } else {
        column.type = undefined
      }

      // 独立属性解析时注意隔断同对象引用
      widths.set(
        column.key,
        typeof column.width === 'string'
          ? COLUMN_DEFAULT_MIN_WIDTH
          : Math.round(
            boundRange(
              column.width || COLUMN_DEFAULT_WIDTH,
              column.minWidth || COLUMN_DEFAULT_MIN_WIDTH,
              column.maxWidth || Infinity,
            ),
          ),
      )
      sorters.set(column.key, parseSorter(column.sorter))
      filters.set(column.key, parseFilter(column.filter))

      const fixed = column.fixed

      if (fixed === true || fixed === 'left') {
        leftFixedColumns.push(column)
      } else if (fixed === 'right') {
        rightFixedColumns.push(column)
      } else {
        normalColumns.push(column)
      }
    }

    if (state.allColumns.length > allColumns.length) {
      for (let i = allColumns.length - 1, len = state.allColumns.length; i < len; ++i) {
        state.rowMap.delete(`${TABLE_HEAD_PREFIX}${i}`)
      }
    }

    for (let i = 0, len = allColumns.length; i < len; ++i) {
      const rowKey = `${TABLE_HEAD_PREFIX}${i}`

      state.rowMap.set(rowKey, createMinRowState(rowKey))
    }

    state.columnMap = columnMap
    state.columns = Array.from(leftFixedColumns).concat(normalColumns, rightFixedColumns)
    state.normalColumns = normalColumns
    state.allColumns = allColumns

    if (state.columns.length) {
      for (const column of state.columns) {
        if (!column.type) {
          column.first = true
          break
        }
      }

      getLast(state.columns)!.last = true
    }

    if (leftFixedColumns.length) {
      state.leftFixedColumns = leftFixedColumns
    }

    if (rightFixedColumns.length) {
      state.rightFixedColumns = rightFixedColumns
    }
  }

  function setColumnProp(key: Key, prop: string, value: any) {
    if (state.columnMap.has(key)) {
      ;(state.columnMap.get(key) as any)[prop] = value
    }
  }

  function buildSummaryKey(key: Key) {
    return typeof key === 'symbol' ? key : `${TABLE_FOOT_PREFIX}${key}`
  }

  function setSummaries(summaries: TableSummaryOptions[]) {
    summaries = Array.from(summaries).sort((prev, next) => {
      return (prev.order || 0) - (next.order || 0)
    })

    const prevKeys = new Set(state.summaries.map(summary => summary.key))
    const aboveSummaries: SummaryWithKey[] = []
    const belowSummaries: SummaryWithKey[] = []
    const summaryMap = new Map<Key, SummaryWithKey>()

    for (let i = 0, len = summaries.length; i < len; ++i) {
      const summary = { ...summaries[i] } as SummaryWithKey

      let key = summary.key

      if (isNull(key)) {
        console.error('[vexip-ui:Table] Table summary requires key prop, but missing')

        key = getIndexId()
      }

      summary.key = key
      ;(summary.above ? aboveSummaries : belowSummaries).push(summary)

      if (!prevKeys.has(summary.key)) {
        const rowKey = buildSummaryKey(summary.key)

        state.rowMap.set(rowKey, createMinRowState(rowKey))
      }

      prevKeys.delete(summary.key)
      summaryMap.set(summary.key, summary)
    }

    state.summaries = Array.from(aboveSummaries).concat(belowSummaries)
    state.summaryMap = summaryMap

    if (aboveSummaries.length) {
      state.aboveSummaries = aboveSummaries
    }

    if (belowSummaries.length) {
      state.belowSummaries = belowSummaries
    }

    if (prevKeys.size) {
      for (const key of prevKeys) {
        state.rowMap.delete(buildSummaryKey(key))
      }
    }
  }

  function setSummaryProp(key: Key, prop: string, value: any) {
    if (state.summaryMap.has(key)) {
      ;(state.summaryMap.get(key) as any)[prop] = value
    }
  }

  function setDataKey(field: string) {
    const oldDataKey = state.dataKey

    if (!isNull(field) && oldDataKey !== field) {
      const { rowData, idMaps } = state

      state.dataKey = field

      rowData.forEach(row => {
        let key = row.data[field] as Key

        if (isNull(key)) {
          key = getIndexId()
        }

        row.key = key
        idMaps.set(row.data, key)
      })
    }
  }

  function collectUnderRows(row: TableRowState, result: TableRowState[] = []) {
    if (row.treeExpanded && row.children?.length) {
      for (const childRow of row.children) {
        result.push(childRow)
        collectUnderRows(childRow, result)
      }
    }

    return result
  }

  function setData(data: Data[]) {
    const clonedData: TableRowState[] = []
    const rowMap = new Map<Key, TableRowState>()
    const { allColumns, dataKey, keyConfig, idMaps, disabledTree } = state
    const oldDataMap = state.rowMap
    const hidden = !!state.virtual

    const {
      children: childrenKey,
      checked: checkedKey,
      height: heightKey,
      expanded: expandedKey,
      treeExpanded: treeExpandedKey,
    } = keyConfig

    for (let i = 0, len = allColumns.length; i < len; ++i) {
      const key = `${TABLE_HEAD_PREFIX}${i}`

      rowMap.set(key, oldDataMap.get(key) || createMinRowState(key))
    }

    for (const summary of state.summaries) {
      const key = buildSummaryKey(summary.key)

      rowMap.set(key, oldDataMap.get(key) || createMinRowState(key))
    }

    const parseRow = (origin: Data[], result: TableRowState[], parent?: TableRowState) => {
      for (let i = 0, len = origin.length; i < len; ++i) {
        const item = origin[i]

        let key = item[dataKey] as Key

        if (isNull(key)) {
          key = idMaps.get(item)!

          if (isNull(key)) {
            key = getIndexId()
          }
        }

        let row: TableRowState

        if (oldDataMap.has(key)) {
          row = oldDataMap.get(key)!

          const {
            [checkedKey]: checked,
            [heightKey]: height,
            [expandedKey]: expanded,
            [treeExpandedKey]: treeExpanded,
          } = row.data !== item ? Object.assign(row.data, item) : row.data

          row.checked = !isNull(checked) ? !!checked : row.checked
          row.height = !isNull(height) ? toNumber(height) : row.height
          row.expanded = !isNull(expanded) ? !!expanded : row.expanded
          row.treeExpanded = !isNull(treeExpanded) ? !!treeExpanded : row.treeExpanded
        } else {
          const {
            [checkedKey]: checked,
            [heightKey]: height,
            [expandedKey]: expanded,
            [treeExpandedKey]: treeExpanded,
          } = item

          row = {
            key,
            hidden,
            checked: !!checked,
            height: toNumber(height),
            expanded: !!expanded,
            hover: false,
            expandHeight: 0,
            index: -1,
            children: [],
            depth: 0,
            treeExpanded: !!treeExpanded,
            partial: false,
            dragging: false,
            listIndex: 0,
            cellHeights: reactive({}),
            last: false,
            expandAnimate: false,
            data: item,
          }

          idMaps.set(item, key)
        }

        if (parent) {
          row.parent = parent.key
          row.depth = parent.depth + 1
        }

        row.children = []

        const children = row.data[childrenKey]
        children?.length && parseRow(children, row.children, row)

        result.push(row)
        rowMap.set(key, row)
      }
    }

    parseRow(data, clonedData)

    state.rowMap = rowMap
    state.treeRowData = clonedData

    if (!disabledTree) {
      flatTreeRows()
    } else {
      state.rowData = clonedData
    }

    state.data = data

    refreshRowIndex()
    computePartial()
  }

  function flatTreeRows() {
    if (state.disabledTree) return

    const rowData: TableRowState[] = []

    for (const row of state.treeRowData) {
      rowData.push(row)
      collectUnderRows(row, rowData)
    }

    state.rowData = rowData
  }

  function refreshRowDepth() {
    walkTree(state.treeRowData, (row, depth) => {
      row.depth = depth
    })
  }

  function setCurrentPage(currentPage: number) {
    state.currentPage = currentPage ?? 1
  }

  function setPageSize(pageSize: number) {
    state.pageSize = pageSize || 0
  }

  function setRowClass(rowClass: ClassType | TableRowPropFn<ClassType>) {
    state.rowClass = rowClass ?? ''
  }

  function setRowStyle(rowStyle: StyleType | TableRowPropFn<StyleType>) {
    state.rowStyle = rowStyle ?? ''
  }

  function setRowAttrs(rowAttrs: Record<string, any> | TableRowPropFn<Record<string, any>>) {
    state.rowAttrs = rowAttrs ?? null!
  }

  function setCellClass(cellClass: ClassType | TableCellPropFn<ClassType>) {
    state.cellClass = cellClass ?? ''
  }

  function setCellStyle(cellStyle: StyleType | TableCellPropFn<StyleType>) {
    state.cellStyle = cellStyle ?? ''
  }

  function setCellAttrs(cellAttrs: Record<string, any> | TableCellPropFn<Record<string, any>>) {
    state.cellAttrs = cellAttrs ?? null!
  }

  function setHeadClass(headClass: ClassType | TableHeadPropFn<ClassType>) {
    state.headClass = headClass ?? ''
  }

  function setHeadStyle(headStyle: StyleType | TableHeadPropFn<StyleType>) {
    state.headStyle = headStyle ?? ''
  }

  function setHeadAttrs(headAttrs: Record<string, any> | TableHeadPropFn<Record<string, any>>) {
    state.headAttrs = headAttrs ?? null!
  }

  function setFootClass(footClass: ClassType | TableFootPropFn<ClassType>) {
    state.footClass = footClass ?? ''
  }

  function setFootStyle(footStyle: StyleType | TableFootPropFn<StyleType>) {
    state.footStyle = footStyle ?? ''
  }

  function setFootAttrs(footAttrs: Record<string, any> | TableFootPropFn<Record<string, any>>) {
    state.footAttrs = footAttrs ?? null!
  }

  function setTableWidth(width: number) {
    width = toNumber(width)

    const { columns, widths, resized } = state

    const hasWidthColumns: ColumnWithKey[] = []
    const flexColumns: ColumnWithKey[] = []

    let flexWidth = width

    for (let i = 0, len = columns.length; i < len; ++i) {
      const column = columns[i]
      const { minWidth, maxWidth } = column

      if (resized.has(column.key)) {
        flexWidth -= widths.get(column.key)!
        hasWidthColumns.push(column)
      } else if (column.width) {
        if (typeof column.width === 'string') {
          const percent = boundRange(toNumber(column.width), 0, 100)

          if (percent) {
            const fixedWidth = Math.round(
              boundRange(
                (width * percent) / 100,
                minWidth || COLUMN_DEFAULT_MIN_WIDTH,
                maxWidth || Infinity,
              ),
            )

            flexWidth -= fixedWidth
            widths.set(column.key, fixedWidth)
            hasWidthColumns.push(column)
          } else {
            flexColumns.push(column)
          }
        } else {
          const width = Math.round(
            boundRange(
              column.width || COLUMN_DEFAULT_WIDTH,
              minWidth || COLUMN_DEFAULT_MIN_WIDTH,
              maxWidth || Infinity,
            ),
          )

          flexWidth -= width
          widths.set(column.key, width)
          hasWidthColumns.push(column)
        }
      } else {
        flexColumns.push(column)
      }
    }

    const flexColumnCount = flexColumns.length
    const flexWidths = distributeWidths(flexColumns, flexWidth)

    let usedWidth = 0

    for (let i = 0; i < flexColumnCount; ++i) {
      const column = flexColumns[i]
      const width = Math[i % 2 ? 'ceil' : 'floor'](flexWidths[i])

      if (i < flexColumnCount - 1) {
        usedWidth += width
      }

      widths.set(column.key, width)
    }

    if (flexColumnCount && flexWidth >= usedWidth + getLast(flexWidths)!) {
      widths.set(getLast(flexColumns)!.key, flexWidth - usedWidth)
    }

    state.width = width
  }

  function distributeWidths(columns: ColumnWithKey[], totalWidth: number): number[] {
    const count = columns.length
    const baseWidth = Math.max(totalWidth / count, COLUMN_DEFAULT_WIDTH)

    const widths = columns.map(col => {
      let w = baseWidth
      if (col.minWidth != null) w = Math.max(w, col.minWidth)
      if (col.maxWidth != null) w = Math.min(w, col.maxWidth)
      return w
    })

    const currentTotal = widths.reduce((a, b) => a + b, 0)
    let delta = totalWidth - currentTotal

    const canGrow = (i: number) => columns[i].maxWidth == null || widths[i] < columns[i].maxWidth!
    const canShrink = (i: number) => columns[i].minWidth == null || widths[i] > columns[i].minWidth!

    const epsilon = 0.1
    let adjusted = false

    while (Math.abs(delta) > epsilon) {
      const adjustableIndices = widths
        .map((_, i) => {
          if (delta > 0 && canGrow(i)) return i
          if (delta < 0 && canShrink(i)) return i
          return -1
        })
        .filter(i => i !== -1)

      if (adjustableIndices.length === 0) {
        adjusted = false
        break
      }

      const adjustment = delta / adjustableIndices.length
      for (const i of adjustableIndices) {
        const old = widths[i]
        let next = old + adjustment

        if (columns[i].minWidth != undefined) next = Math.max(next, columns[i].minWidth!)
        if (columns[i].maxWidth != undefined) next = Math.min(next, columns[i].maxWidth!)

        delta -= next - old
        widths[i] = next
      }

      adjusted = true
    }

    // delta > 0 且无法再调整时，强行补给最后一列
    if (!adjusted && delta > epsilon) {
      widths[count - 1] += delta
    }

    return widths
  }

  function setRowHeight(height: number) {
    state.rowHeight = height
  }

  function setRowMinHeight(height: number) {
    state.rowMinHeight = height
  }

  function setCellHeight(rowKey: Key, columnKey: Key, height: number) {
    if (!isNull(height) && state.rowMap.has(rowKey)) {
      state.rowMap.get(rowKey)!.cellHeights[columnKey] = height
    }
  }

  function setRowDraggable(draggable: boolean) {
    state.rowDraggable = !!draggable
  }

  function setBodyYScroll(scroll: number) {
    state.bodyYScroll = scroll
  }

  function setBodyXScroll(scroll: number) {
    state.bodyXScroll = scroll
  }

  function setBorder(able: boolean) {
    state.border = !!able
  }

  function setStripe(able: boolean) {
    state.stripe = !!able
  }

  function setHighlight(able: boolean) {
    state.highlight = !!able
  }

  function setVirtual(virtual: boolean) {
    state.virtual = !!virtual
  }

  function setRowProp(key: Key, prop: Exclude<keyof TableRowState, 'key'>, value: any) {
    const row = state.rowMap.get(key)

    if (row && row[prop] !== value) {
      ;(row as any)[prop] = value
    }
  }

  function setLocale(locale: LocaleConfig['table']) {
    state.locale = locale
  }

  function setTooltipTheme(theme: TooltipTheme) {
    state.tooltipTheme = theme
  }

  function setTooltipWidth(theme: number | string) {
    state.tooltipWidth = theme
  }

  function setSingleSorter(able: boolean) {
    state.singleSorter = !!able
  }

  function setSingleFilter(able: boolean) {
    state.singleFilter = !!able
  }

  function setDragging(dragging: boolean) {
    state.dragging = !!dragging
  }

  function setKeyConfig(keyConfig: Required<TableKeyConfig>) {
    state.keyConfig = keyConfig
  }

  function setDisabledTree(disabled: boolean) {
    state.disabledTree = !!disabled
  }

  function setNoCascaded(noCascaded: boolean) {
    state.noCascaded = !!noCascaded
  }

  function setColResizable(resizable: boolean | TableColResizeType) {
    state.colResizable = resizable === true ? 'lazy' : resizable
  }

  function setCustomSorter(able: boolean) {
    state.customSorter = !!able
  }

  function setCustomFilter(able: boolean) {
    state.customFilter = !!able
  }

  function setColumnResizing(resizing: boolean) {
    state.colResizing = !!resizing
  }

  function setResizeLeft(left: number) {
    state.resizeLeft = left
  }

  function setExpandRenderer(renderer: ExpandRenderFn | null) {
    state.expandRenderer = renderer
  }

  function setCellSpan(spanFn: TableCellSpanFn | null) {
    state.cellSpan = spanFn
  }

  function setSidePadding(padding: number | number[]) {
    state.sidePadding = Array.isArray(padding) ? padding : [padding, padding]
  }

  function setBorderWidth(width: number) {
    state.borderWidth = Math.max(width, 0)
  }

  function setDataFilter(filter: (data: Data) => boolean) {
    state.dataFilter = filter
  }

  function setEllipsis(ellipsis: boolean) {
    state.ellipsis = ellipsis
  }

  function setLocked(locked: boolean) {
    state.locked = locked
  }

  function setBarScrolling(scrolling: boolean) {
    state.barScrolling = scrolling
  }

  function handleSort(key: Key, type: ParsedTableSorterOptions['type']) {
    if (state.sorters.has(key)) {
      if (state.singleSorter && type) {
        clearSort()
      }

      state.sorters.get(key)!.type = type
    }
  }

  function clearSort() {
    const sorters = state.sorters

    for (const sorter of sorters.values()) {
      sorter.type = null
    }
  }

  function handleFilter(key: Key, active: ParsedFilterOptions['active']) {
    if (state.filters.has(key)) {
      if (state.singleFilter && (Array.isArray(active) ? active.length : active)) {
        clearFilter()
      }

      state.filters.get(key)!.active = Array.isArray(active) ? Array.from(active) : active
    }
  }

  function clearFilter() {
    const filters = state.filters

    for (const filter of filters.values()) {
      filter.active = null

      for (const option of filter.options) {
        option.active = false
      }
    }
  }

  const { updateCheckedUpward, updateCheckedDown } = useCascadedChecked({
    getNode: key => state.rowMap.get(key),
    disableNode: row => disableCheckRows.value.has(row.key),
  })

  function computeChecked(key: Key) {
    const { rowMap, rowData } = state
    const { disableCheckRows } = getters

    if (!rowMap.has(key)) return

    const rowList = [rowMap.get(key)!].concat(
      // 需要包含被禁用且被勾选的节点
      rowData.filter(row => disableCheckRows.has(row.key) && row.checked),
    )

    for (let i = 0, len = rowList.length; i < len; ++i) {
      updateCheckedUpward(rowList[i].key)
      updateCheckedDown(rowList[i].key)
    }
  }

  function handleCheck(key: Key, checked: boolean, single = false) {
    const { rowMap, noCascaded } = state
    const { disableCheckRows } = getters
    const row = rowMap.get(key)

    if (!row) return

    if (single) {
      clearCheckAll(true)
      row.checked = !!checked
    }

    if (!disableCheckRows.has(key)) {
      row.checked = !!checked
      row.partial = false
    }

    !noCascaded && computeChecked(key)
    computePartial()
  }

  function handleCheckAll() {
    const { rowData, checkedAll } = state
    const { disableCheckRows } = getters

    let checked = !checkedAll

    // 阻断 disabled 元素对全选的影响
    if (disableCheckRows.size) {
      // 由于被禁用的元素不可被操作，如果存在被禁用的元素且该状态为未被选中，则全选时仍然是 partial 状态
      // 假设除了禁用的元素，其余元素均为选中状态（此时对于用户来说属于已经全选，点击的期望是取消全选）
      let partialCheckedAll = true

      for (const row of rowData) {
        // 检查是否存在非禁用的且未被选中的元素（如有则证明现在不是全选，用户点击的期望是进行全选）
        if (!disableCheckRows.has(row.key) && !row.checked) {
          partialCheckedAll = false

          break
        }
      }

      checked = !partialCheckedAll
    }

    for (const row of rowData) {
      if (!disableCheckRows.has(row.key)) {
        row.checked = checked
      }
    }

    state.checkedAll = checked
    state.partial = false

    computePartial()
  }

  function clearCheckAll(includeDisabled = false) {
    const { rowData } = state
    const { disableCheckRows } = getters

    for (const row of rowData) {
      if (includeDisabled || !disableCheckRows.has(row.key)) {
        row.checked = false
      }

      if (includeDisabled) {
        row.partial = false
      }
    }

    state.checkedAll = false
    state.partial = false

    !includeDisabled && computePartial()
  }

  function computePartial() {
    const data = state.rowData

    let hasChecked = false
    let hasNotChecked = false
    let partial = false

    for (let i = 0, len = data.length; i < len; ++i) {
      const row = data[i]

      if (row.checked) {
        hasChecked = true
      } else {
        hasNotChecked = true
      }

      if (hasChecked && hasNotChecked) {
        partial = true

        break
      }
    }

    if (hasChecked && !partial) {
      state.checkedAll = true
    } else {
      state.checkedAll = false
    }

    state.partial = partial
  }

  function setRenderRows(start: number, end: number, force = false) {
    const { startRow, endRow, heightBITree, virtualData } = state

    if (!force && start === startRow && end === endRow) return

    const { processedData } = getters

    if (!processedData.length) {
      virtualData.length = 0
      return
    }

    const prevData = new Set([...virtualData])
    const added: TableRowState[] = []
    const removed: TableRowState[] = []

    for (let i = 0, len = processedData.length; i < len; ++i) {
      const data = processedData[i]

      data.hidden = !(i >= start && i < end)

      if (data.hidden) {
        data.hover = false

        if (prevData.has(data)) {
          removed.push(data)
        }
      } else if (!prevData.has(data)) {
        added.push(data)
      }

      prevData.delete(data)
    }

    removed.push(...prevData)

    const length = Math.min(added.length, removed.length)

    for (let i = 0; i < length; ++i) {
      virtualData[virtualData.indexOf(removed[i])] = added[i]
    }

    if (added.length > removed.length) {
      virtualData.push(...added.slice(length))
    } else if (added.length < removed.length) {
      state.virtualData = virtualData.filter(data => !removed.includes(data))
    }

    state.padTop = heightBITree?.sum(start) ?? 0
    state.startRow = start
    state.endRow = end
  }

  function handleExpand(key: Key, expanded: boolean) {
    const { rowMap } = state
    const { disableExpandRows } = getters

    if (rowMap.has(key) && !disableExpandRows.has(key)) {
      rowMap.get(key)!.expanded = !!expanded
    }
  }

  function handleDrag(key: Key, dragging: boolean) {
    const { rowMap } = state
    const { disableDragRows } = getters

    if (rowMap.has(key) && !disableDragRows.has(key)) {
      rowMap.get(key)!.dragging = !!dragging
    }
  }

  function setTreeExpanded(key: Key, expanded: boolean) {
    if (!usingTree.value) return

    const { rowMap, rowData, virtual } = state
    const row = rowMap.get(key)

    if (!row?.children?.length) return

    const underRows = collectUnderRows({ ...row, treeExpanded: true })

    if (expanded) {
      rowData.splice(row.index + 1, 0, ...underRows)
    } else {
      rowData.splice(row.index + 1, underRows.length)
    }

    row.treeExpanded = !!expanded

    refreshRowIndex()
    virtual && setRenderRows(state.startRow, state.endRow, true)
  }

  function toggleFilterItemActive(options: {
    key: Key,
    value: number | string | null,
    active?: boolean,
    disableOthers?: boolean
  }) {
    const { key, value, active = false, disableOthers = false } = options

    if (state.filters.has(key)) {
      const filterOptions = state.filters.get(key)!.options

      if (disableOthers) {
        for (let i = 0, len = filterOptions.length; i < len; ++i) {
          filterOptions[i].active = false
        }
      }

      const item = filterOptions.find(item => item.value === value)

      if (item) {
        item.active = active
      }
    }
  }

  function refreshRowIndex() {
    const data = state.rowData

    for (let i = 0, len = data.length; i < len; ++i) {
      data[i].index = i
    }
  }

  function updateTotalHeight() {
    const { heightBITree } = state

    if (heightBITree) {
      state.totalHeight = heightBITree.sum() ?? 0
    } else {
      state.totalHeight = 0
    }
  }

  function parseSorter(sorter: boolean | TableSorterOptions = false): ParsedTableSorterOptions {
    const raw = typeof sorter === 'boolean' ? { able: sorter } : sorter
    const { able = true, type = null, order = 0, method = null } = raw

    return { able, type, order, method }
  }

  function parseFilter(filter?: TableFilterOptions | null): ParsedFilterOptions {
    filter = filter || { able: false, options: [] }

    const {
      able = true,
      custom = false,
      multiple = false,
      active = null,
      method = null,
      meta,
    } = filter
    // 防止内部变化触发 deep watch
    const options = deepClone(filter.options ?? [])
    const formattedOptions = []

    for (let i = 0, len = options.length; i < len; ++i) {
      const item = options[i]
      const option = typeof item === 'string' ? { value: item } : { ...item }

      option.label = option.label ?? option.value.toString()

      let isActive = false

      if (multiple && Array.isArray(active)) {
        isActive = active.includes(option.value)
      } else if (!isNull(active)) {
        isActive = Object.is(option.value, active)
      }

      option.active = isActive

      formattedOptions.push(option as { value: string | number, label: string, active: boolean })
    }

    return { able, custom, meta, options: formattedOptions, multiple, active, method }
  }

  function filterData(
    filters: Map<Key, ParsedFilterOptions>,
    data: TableRowState[],
    isSingle: boolean,
  ) {
    const usedFilter: ParsedFilterOptions[] = []
    const usedData: TableRowState[] = []

    for (const filter of filters.values()) {
      const { able, active, method } = filter

      if (able && active && typeof method === 'function') {
        usedFilter.push(filter)

        if (isSingle) break
      }
    }

    const usedFilterCount = usedFilter.length

    for (let i = 0, len = data.length; i < len; ++i) {
      const row = data[i]

      let isFilter = true

      for (let j = 0; j < usedFilterCount; j++) {
        const { active, method } = usedFilter[j]

        isFilter = method!(active! as any, row.data)

        if (!isFilter) {
          break
        }
      }

      if (isFilter) {
        usedData.push(row)
      }
    }

    return usedData
  }

  function sortData(
    sorters: Map<Key, ParsedTableSorterOptions>,
    data: TableRowState[],
    columns: TableColumnOptions[],
    isSingle: boolean,
  ) {
    const usedSorter = []

    for (const [_key, sorter] of sorters) {
      const key = _key as keyof TableRowState
      const { able, type, order, method } = sorter

      if (able && type) {
        const column = columns.find(item => item.key === key)
        const accessor = column?.accessor

        usedSorter.push({
          able,
          key,
          order,
          type,
          method: method ?? undefined,
          accessor(row: TableRowState) {
            if (typeof accessor === 'function') {
              return accessor(row.data, row.index)
            }

            return row.data[key]
          },
        })

        if (isSingle) break
      }
    }

    // 多列排序优先级
    usedSorter.sort((prev, next) => prev.order - next.order)

    return sortByProps(data, usedSorter)
  }

  function pageData(currentPage: number, pageSize: number, data: TableRowState[]) {
    return pageSize > 0 ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize) : data
  }

  function getParentRow(key: Key) {
    const { rowMap } = state
    const row = rowMap.get(key)

    if (!isNull(row?.parent)) {
      return rowMap.get(row!.parent) ?? null
    }

    return null
  }

  let lastColumnWidth: number | undefined

  function handleColumnResize(keys: Key[], newWidth: number) {
    const { resized, widths, columns, columnMap, width: tableWidth } = state
    const length = keys.length

    if (!columns.length || !length) return

    const deltaWidth = newWidth / length
    const lastKey = getLast(columns)!.key

    for (let i = 0; i < length; ++i) {
      const key = keys[i]
      const column = columnMap.get(key) as ColumnWithKey

      if (!column) continue

      const width =
        length === 1 ? Math.round(deltaWidth) : Math[i % 2 ? 'ceil' : 'floor'](deltaWidth)
      const { minWidth, maxWidth } = column

      resized.add(key)
      widths.set(key, boundRange(width, minWidth || COLUMN_DEFAULT_MIN_WIDTH, maxWidth || Infinity))
    }

    let totalWidth = 0

    for (const width of widths.values()) {
      totalWidth += width
    }

    totalWidth = toFixed(totalWidth, 1)

    if (
      totalWidth - widths.get(lastKey)! <
      tableWidth - (lastColumnWidth ?? widths.get(lastKey)!)
    ) {
      if (!lastColumnWidth) {
        lastColumnWidth = widths.get(lastKey)
      }

      widths.set(lastKey, widths.get(lastKey)! + tableWidth - totalWidth)
    } else if (lastColumnWidth) {
      widths.set(lastKey, lastColumnWidth!)
      lastColumnWidth = undefined
    }
  }

  function computeCellSpan() {
    const {
      normalColumns,
      leftFixedColumns,
      rightFixedColumns,
      aboveSummaries,
      belowSummaries,
      rowData,
      cellSpanMap,
      collapseMap,
    } = state
    const { processedData } = getters

    for (const type of ['left', 'default', 'right'] as const) {
      cellSpanMap.set(type, new Map())
      collapseMap.set(type, new Map())
    }

    function setCellSpan(
      rowIndex: number,
      columnIndex: number,
      fixed: 'left' | 'default' | 'right',
      getSpan: () => Required<CellSpanResult>,
      prefix = '',
    ) {
      const masterKey = `${prefix}${rowIndex},${columnIndex}`
      const collapsed = collapseMap.get(fixed)!

      if (collapsed.has(masterKey)) {
        cellSpanMap.get(fixed)!.set(masterKey, { colSpan: 0, rowSpan: 0 })
        return
      }

      const span = getSpan()
      const { colSpan, rowSpan } = span

      for (let i = 0; i < colSpan; ++i) {
        for (let j = 0; j < rowSpan; ++j) {
          if (!i && !j) continue

          const key = `${prefix}${rowIndex + j},${columnIndex + i}`

          let masterSet = collapsed.get(key)

          if (!masterSet) {
            masterSet = new Set()
            collapsed.set(key, masterSet)
          }

          masterSet.add(masterKey)
        }
      }

      cellSpanMap.get(fixed)!.set(masterKey, span)
    }

    for (const columns of [normalColumns, leftFixedColumns, rightFixedColumns]) {
      if (!columns.length) continue

      const fixed = columns[0].fixed === true ? 'left' : columns[0].fixed || 'default'
      const columnFixed = columns[0].fixed === true ? 'left' : columns[0].fixed || undefined

      const left = state.leftFixedColumns.length
      const right = state.allColumns[0].length - state.rightFixedColumns.length

      let allColumns: ColumnRawWithKey[][]

      if (fixed === 'left') {
        allColumns = state.allColumns.map(columns => columns.slice(0, left))
      } else if (fixed === 'right') {
        allColumns = state.allColumns.map(columns =>
          columns.slice(right, state.allColumns[0].length),
        )
      } else {
        allColumns = state.allColumns.map(columns => columns.slice(left, right))
      }

      for (let i = 0, len1 = allColumns.length; i < len1; ++i) {
        const rowColumns = allColumns[i]

        for (let j = 0, len2 = rowColumns.length; j < len2; ++j) {
          const column = rowColumns[j]

          if (!column) continue

          const fixed = column.fixed === true ? 'left' : column.fixed || 'default'

          setCellSpan(
            i,
            j,
            fixed,
            () => {
              const columns =
                fixed === 'left'
                  ? leftFixedColumns
                  : fixed === 'right'
                    ? rightFixedColumns
                    : normalColumns
              const colSpan = boundRange(column.headSpan ?? 1, 0, columns.length - j)
              const span = { colSpan, rowSpan: column.rowSpan }

              return span
            },
            'h',
          )
        }
      }

      for (let colIndex = 0, len = columns.length; colIndex < len; ++colIndex) {
        const column = columns[colIndex]

        for (const row of rowData) {
          setCellSpan(row.index, column.index, fixed, () => {
            let result: ReturnType<ColumnCellSpanFn>

            if (typeof column.cellSpan === 'function') {
              result = column.cellSpan({
                row: row.data,
                index: row.index,
                fixed: columnFixed,
              })
            } else if (typeof state.cellSpan === 'function') {
              result = state.cellSpan({
                row: row.data,
                rowIndex: row.index,
                column,
                columnIndex: column.index,
                fixed: columnFixed,
              })
            }

            result = result! || { colSpan: 1, rowSpan: 1 }

            const span = { colSpan: result.colSpan ?? 1, rowSpan: result.rowSpan ?? 1 }

            span.colSpan = boundRange(span.colSpan, 0, columns.length - colIndex)
            span.rowSpan = boundRange(span.rowSpan, 0, processedData.length - row.listIndex)

            return span
          })
        }

        for (const { prefix, summaries } of [
          { prefix: 'af', summaries: aboveSummaries },
          { prefix: 'bf', summaries: belowSummaries },
        ]) {
          for (let i = 0, len = summaries.length; i < len; ++i) {
            const summary = summaries[i]

            setCellSpan(
              i,
              column.index,
              fixed,
              () => {
                let result: ReturnType<SummaryCellSpanFn>

                if (typeof summary.cellSpan === 'function') {
                  result = summary.cellSpan({
                    column,
                    index: column.index,
                    fixed: columnFixed,
                  })
                }

                const { colSpan, rowSpan } = result! || { colSpan: 1, rowSpan: 1 }
                const span = { colSpan: colSpan ?? 1, rowSpan: rowSpan ?? 1 }

                span.colSpan = boundRange(span.colSpan, 0, columns.length - colIndex)
                span.rowSpan = boundRange(span.rowSpan, 0, summaries.length - i)

                return span
              },
              prefix,
            )
          }
        }
      }
    }
  }

  function getCurrentData() {
    const { treeRowData, disabledTree, keyConfig } = state

    if (disabledTree) {
      return treeRowData.map(row => ({ ...row.data }))
    }

    return mapTree(treeRowData, row => ({ ...row.data }), {
      childField: keyConfig.children as 'children',
    })
  }

  function queryRow(keyOrData: Key | Record<any, any>) {
    const { dataKey, rowMap, idMaps } = state

    let key: Key

    if (typeof keyOrData === 'object') {
      key = idMaps.get(keyOrData) ?? keyOrData[dataKey]
    } else {
      key = keyOrData
    }

    return isNull(key) ? undefined : rowMap.get(key)
  }

  type Store = Readonly<{
    state: Readonly<typeof state>,
    getters: Readonly<typeof getters>,
    mutations: Readonly<typeof mutations>
  }>

  return { state, getters, mutations } as Store
}

export type TableStore = ReturnType<typeof useStore>
