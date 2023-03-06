import { reactive, computed, watchEffect, markRaw } from 'vue'
import {
  isNull,
  debounceMinor,
  toNumber,
  sortByProps,
  deepClone,
  createBITree
} from '@vexip-ui/utils'
import { DEFAULT_KEY_FIELD, TABLE_HEAD_KEY } from './symbol'

import type { ClassType, StyleType, LocaleConfig } from '@vexip-ui/config'
import type { TooltipTheme } from '@/components/tooltip'
import type {
  Key,
  Data,
  TableKeyConfig,
  RowPropFn,
  CellPropFn,
  HeadPropFn,
  FilterOptions,
  ParsedFilterOptions,
  SorterOptions,
  ParsedSorterOptions,
  SelectionColumn,
  ExpandColumn,
  TableColumnOptions,
  ColumnWithKey,
  RowState,
  StoreOptions,
  StoreState
} from './symbol'

let indexId = 1

function getIndexId() {
  return `__vtr-${indexId++}`
}

function defaultIndexLabel(index: number) {
  return index + 1
}

export function useStore(options: StoreOptions) {
  const state = reactive({
    columns: [],
    data: [],
    rowClass: '',
    rowStyle: '',
    rowAttrs: null!,
    cellClass: '',
    cellStyle: '',
    cellAttrs: null!,
    headClass: '',
    headStyle: '',
    headAttrs: null!,
    width: 0,
    dataKey: options.dataKey ?? DEFAULT_KEY_FIELD,
    highlight: false,
    currentPage: 1,
    pageSize: 0,
    rowHeight: options.rowHeight,
    rowMinHeight: options.rowMinHeight || 36,
    virtual: options.virtual,
    rowDraggable: !!options.rowDraggable,
    locale: options.locale,
    tooltipTheme: options.tooltipTheme,
    tooltipWidth: options.tooltipWidth,
    singleSorter: options.singleSorter,
    singleFilter: options.singleFilter,
    customSorter: options.customSorter,
    customFilter: options.customFilter,
    keyConfig: options.keyConfig,
    disabledTree: options.disabledTree,
    noCascaded: options.noCascaded,
    expandRenderer: options.expandRenderer,

    rowData: [],
    rightFixedColumns: [],
    leftFixedColumns: [],
    rowMap: new Map(),
    idMaps: new WeakMap(),
    checkedAll: false,
    partial: false,
    widths: {},
    sorters: {},
    filters: {},
    bodyScroll: 0,
    padTop: 0,
    startRow: 0,
    endRow: 0,
    dragging: false,
    heightBITree: null!,
    virtualData: [],
    totalHeight: options.rowMinHeight * options.data.length
  }) as StoreState

  setColumns(options.columns)

  setData(options.data)
  setCurrentPage(options.currentPage)
  setPageSize(options.pageSize)

  setRowClass(options.rowClass)
  setRowStyle(options.rowStyle)
  setRowAttrs(options.rowAttrs)
  setCellClass(options.cellClass)
  setCellStyle(options.cellStyle)
  setCellAttrs(options.cellAttrs)
  setHeadClass(options.headClass)
  setHeadStyle(options.headStyle)
  setHeadAttrs(options.headAttrs)
  setHighlight(options.highlight)
  setVirtual(options.virtual)

  const filteredData = computed(() => {
    return state.customFilter
      ? state.rowData
      : filterData(state.filters, state.rowData, state.singleFilter)
  })
  const sortedData = computed(() => {
    return state.customSorter
      ? filteredData.value
      : sortData(state.sorters, filteredData.value, state.columns, state.singleSorter)
  })
  const processedData = computed(() => {
    return pageData(state.currentPage, state.pageSize, sortedData.value)
  })
  const disableCheckRows = computed(() => {
    const rowData = processedData.value
    const selection = state.columns.find(item => (item as SelectionColumn).type === 'selection') as
      | SelectionColumn
      | undefined
    const disableCheckRows = new Set<Key>()

    if (selection && typeof selection.disableRow === 'function') {
      const isDisabled = selection.disableRow

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
    const expand = state.columns.find(item => (item as ExpandColumn).type === 'expand') as
      | ExpandColumn
      | undefined
    const disableExpandRows = new Set<Key>()

    if (expand && typeof expand.disableRow === 'function') {
      const isDisabled = expand.disableRow

      for (let i = 0, len = rowData.length; i < len; ++i) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          const key = row.key

          disableExpandRows.add(key)
        }
      }
    }

    return disableExpandRows
  })
  const usingTree = computed(() => {
    return !state.disabledTree && state.rowData.some(row => row.children?.length)
  })

  watchEffect(() => {
    state.heightBITree = markRaw(
      createBITree(filteredData.value.length, state.rowHeight || state.rowMinHeight)
    )
    updateTotalHeight()
  })

  const getters = reactive({
    filteredData,
    sortedData,
    processedData,
    disableCheckRows,
    disableExpandRows,
    usingTree
  })

  const mutations = {
    // 这两个方法被 deep watch 回调
    // 需要防止在一个微任务内被多次调用
    setColumns: debounceMinor(setColumns),
    setData: debounceMinor(setData),

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
    setTableWidth,
    setColumnWidth,
    setRowHeight,
    setBorderHeight,
    setGlobalRowHeight,
    setMinRowHeight,
    setVirtual,
    setRowDraggable,
    setRowExpandHeight,
    setBodyScroll,
    setHighlight,
    setRowHover,
    setLocale,
    setTooltipTheme,
    setTooltipWidth,
    setSingleSorter,
    setSingleFilter,
    setDragging,
    setCustomSorter,
    setCustomFilter,
    setKeyConfig,
    setDisabledTree,
    setNoCascaded,

    handleSort,
    clearSort,
    handleFilter,
    clearFilter,
    toggleFilterItemActive,
    refreshRowIndex,
    updateTotalHeight: debounceMinor(updateTotalHeight),
    handleCheck,
    handleCheckAll,
    clearCheckAll,
    setRenderRows,
    handleExpand,
    handleTreeExpand,
    getParentRow
  }

  function setColumns(columns: TableColumnOptions[]) {
    columns = Array.from(columns).sort((prev, next) => {
      return (prev.order || 0) - (next.order || 0)
    })

    const { widths, sorters, filters } = state

    const normalColumns = []
    const rightFixedColumns = []
    const leftFixedColumns = []
    const columnTypes = ['order', 'selection', 'expand']

    let firstMarked = false

    for (let i = 0, len = columns.length; i < len; ++i) {
      const column = { ...columns[i] } as ColumnWithKey

      if ('type' in column && columnTypes.includes(column.type)) {
        // key = isNull(column.key) ? getIndexId() : column.key

        switch (column.type) {
          case 'order': {
            column.truthIndex = !!column.truthIndex

            if (typeof column.orderLabel !== 'function') {
              column.orderLabel = defaultIndexLabel
            }

            if (isNull(column.width)) column.width = 60

            break
          }
          case 'selection': {
            column.checkboxSize = column.checkboxSize || 'default'

            if (typeof column.disableRow !== 'function') {
              column.disableRow = () => false
            }

            if (isNull(column.width)) column.width = 40

            break
          }
          case 'expand': {
            if (typeof column.disableRow !== 'function') {
              column.disableRow = () => false
            }

            if (isNull(column.width)) column.width = 40

            break
          }
        }
      } else if (!firstMarked) {
        column.first = true
        firstMarked = true
      }

      let key = column.key

      if (isNull(key)) {
        key = getIndexId()

        console.error('[vexip-ui:Table] Table column requires key prop, but missing')
      }

      const fixed = column.fixed

      // 独立属性解析时注意隔断同对象引用
      widths[key] = column.width || 100
      sorters[key] = parseSorter(column.sorter)
      filters[key] = parseFilter(column.filter)

      column.key = key

      if (fixed === true || fixed === 'left') {
        leftFixedColumns.push(column)
      } else if (fixed === 'right') {
        rightFixedColumns.push(column)
      } else {
        normalColumns.push(column)
      }
    }

    state.columns = leftFixedColumns.concat(normalColumns, rightFixedColumns)

    if (leftFixedColumns.length) {
      state.leftFixedColumns = leftFixedColumns
    }

    if (rightFixedColumns.length) {
      state.rightFixedColumns = rightFixedColumns
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

  function collectUnderRows(row: RowState, result: RowState[] = []) {
    if (row.treeExpanded && row.children?.length) {
      for (const childRow of row.children) {
        result.push(childRow)
        collectUnderRows(childRow, result)
      }
    }

    return result
  }

  function setData(data: Data[]) {
    const clonedData: RowState[] = []
    const rowMap = new Map<Key, RowState>()
    const { dataKey, keyConfig, idMaps, disabledTree } = state
    const oldDataMap = state.rowMap
    const hidden = !!state.virtual

    const {
      children: childrenKey,
      checked: checkedKey,
      height: heightKey,
      expanded: expandedKey,
      treeExpanded: treeExpandedKey
    } = keyConfig

    rowMap.set(
      TABLE_HEAD_KEY,
      oldDataMap.get(TABLE_HEAD_KEY) ||
        ({
          key: TABLE_HEAD_KEY
        } as RowState)
    )

    function parseRow(origin: Data[], result: RowState[], parent?: RowState) {
      for (let i = 0, len = origin.length; i < len; ++i) {
        const item = origin[i]

        let key = item[dataKey] as Key

        if (isNull(key)) {
          key = idMaps.get(item)!

          if (isNull(key)) {
            key = getIndexId()
          }
        }

        let row: RowState

        if (oldDataMap.has(key)) {
          row = oldDataMap.get(key)!

          const {
            [checkedKey]: checked,
            [heightKey]: height,
            [expandedKey]: expanded,
            [treeExpandedKey]: treeExpanded
          } = row.data !== item ? Object.assign(row.data, item) : row.data

          row.checked = !isNull(checked) ? !!checked : row.checked
          row.height = !isNull(height) ? toNumber(height) : row.height
          row.expanded = !isNull(expanded) ? !!expanded : row.expanded
          row.treeExpanded = isNull(treeExpanded) ? !!treeExpanded : row.treeExpanded
        } else {
          const {
            [checkedKey]: checked,
            [heightKey]: height,
            [expandedKey]: expanded,
            [treeExpandedKey]: treeExpanded
          } = item

          row = {
            key,
            hidden,
            checked: !!checked,
            height: toNumber(height),
            borderHeight: 0,
            expanded: !!expanded,
            hover: false,
            expandHeight: 0,
            index: -1,
            children: [],
            depth: 0,
            treeExpanded: !!treeExpanded,
            partial: false,
            data: item
          }

          idMaps.set(item, key)
        }

        if (parent) {
          row.parent = parent.key
          row.depth = parent.depth + 1
        }

        const children = row.data[childrenKey]
        children?.length && parseRow(children, (row.children = []), row)

        result.push(row)
        rowMap.set(key, row)
      }
    }

    parseRow(data, clonedData)

    state.rowMap = rowMap

    if (!disabledTree) {
      const rowData: RowState[] = []

      for (const row of clonedData) {
        rowData.push(row)
        collectUnderRows(row, rowData)
      }

      state.rowData = rowData
    } else {
      state.rowData = clonedData
    }

    refreshRowIndex()
    computePartial()
  }

  function setCurrentPage(currentPage: number) {
    state.currentPage = currentPage ?? 1
  }

  function setPageSize(pageSize: number) {
    state.pageSize = pageSize || 0
  }

  function setRowClass(rowClass: ClassType | RowPropFn<ClassType>) {
    state.rowClass = rowClass ?? ''
  }

  function setRowStyle(rowStyle: StyleType | RowPropFn<StyleType>) {
    state.rowStyle = rowStyle ?? ''
  }

  function setRowAttrs(rowAttrs: Record<string, any> | RowPropFn<Record<string, any>>) {
    state.rowAttrs = rowAttrs ?? null!
  }

  function setCellClass(cellClass: ClassType | CellPropFn<ClassType>) {
    state.cellClass = cellClass ?? ''
  }

  function setCellStyle(cellStyle: StyleType | CellPropFn<StyleType>) {
    state.cellStyle = cellStyle ?? ''
  }

  function setCellAttrs(cellAttrs: Record<string, any> | CellPropFn<Record<string, any>>) {
    state.cellAttrs = cellAttrs ?? null!
  }

  function setHeadClass(headClass: ClassType | HeadPropFn<ClassType>) {
    state.headClass = headClass ?? ''
  }

  function setHeadStyle(headStyle: StyleType | HeadPropFn<StyleType>) {
    state.headStyle = headStyle ?? ''
  }

  function setHeadAttrs(headAttrs: Record<string, any> | HeadPropFn<Record<string, any>>) {
    state.headAttrs = headAttrs ?? null!
  }

  function setTableWidth(width: number) {
    width = toNumber(width)

    const { columns, widths } = state

    const hasWidthColumns = []
    const flexColumns = []

    let flexWidth = width

    for (let i = 0, len = columns.length; i < len; ++i) {
      const column = columns[i]

      if (column.width) {
        flexWidth -= column.width
        hasWidthColumns.push(column)
      } else {
        flexColumns.push(column)
      }
    }

    const flexColumnCount = flexColumns.length

    let flexUnitWidth = 100

    // 剩余空间有多时, 均分到弹性列
    // if (flexColumnCount && flexWidth > flexColumnCount * flexUnitWidth) {
    if (flexColumnCount) {
      flexUnitWidth = flexWidth / flexColumnCount
    }

    for (let i = 0; i < flexColumnCount; ++i) {
      const column = flexColumns[i]
      const key = column.key

      widths[key] = flexUnitWidth
    }

    state.width = width
  }

  function setColumnWidth(key: Key, width: number) {
    if (state.widths[key]) {
      state.widths[key] = width
    }
  }

  function setRowHeight(key: Key, height: number) {
    const { rowMap } = state
    const row = rowMap.get(key)

    if (row && row.height !== height) {
      row.height = height
    }
  }

  function setBorderHeight(key: Key, height: number) {
    if (state.rowMap.has(key)) {
      state.rowMap.get(key)!.borderHeight = height
    }
  }

  function setGlobalRowHeight(height: number) {
    state.rowHeight = height
  }

  function setMinRowHeight(height: number) {
    state.rowMinHeight = height
  }

  function setRowDraggable(draggable: boolean) {
    state.rowDraggable = !!draggable
  }

  function setRowExpandHeight(key: Key, height: number) {
    if (state.rowMap.has(key)) {
      state.rowMap.get(key)!.expandHeight = height
    }
  }

  function setBodyScroll(scroll: number) {
    state.bodyScroll = scroll
  }

  function setHighlight(able: boolean) {
    state.highlight = !!able
  }

  function setVirtual(virtual: boolean) {
    state.virtual = !!virtual
  }

  function setRowHover(key: Key, hover: boolean) {
    if (state.rowMap.has(key)) {
      state.rowMap.get(key)!.hover = hover
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

  function setCustomSorter(able: boolean) {
    state.customSorter = !!able
  }

  function setCustomFilter(able: boolean) {
    state.customFilter = !!able
  }

  function handleSort(key: Key, type: ParsedSorterOptions['type']) {
    if (state.sorters[key]) {
      if (state.singleSorter && type) {
        clearSort()
      }

      state.sorters[key].type = type
    }
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

  function clearSort() {
    const sorters = state.sorters

    for (const key of Object.keys(sorters)) {
      sorters[key].type = null
    }
  }

  function handleFilter(key: Key, active: ParsedFilterOptions['active']) {
    if (state.filters[key]) {
      if (state.singleFilter && (Array.isArray(active) ? active.length : active)) {
        clearFilter()
      }

      state.filters[key].active = active
    }
  }

  function clearFilter() {
    const filters = state.filters

    for (const key of Object.keys(filters)) {
      filters[key].active = null

      for (const option of filters[key].options) {
        option.active = false
      }
    }
  }

  function updateCheckedUpward(key: Key) {
    const { rowMap } = state

    if (!rowMap.has(key)) return

    let row = rowMap.get(key)!

    while (!isNull(row.parent)) {
      const parentKey = row.parent

      if (!rowMap.has(parentKey)) break

      const parent = rowMap.get(parentKey)!

      if (row.checked === parent.checked && row.partial === parent.partial) break

      if (row.checked) {
        parent.checked = parent.children.every(child => child.checked)
        parent.partial = !parent.checked
      } else {
        parent.checked = false
        parent.partial = parent.children.some(child => child.checked || child.partial)
      }

      row = parent
    }
  }

  function updateCheckedDown(key: Key) {
    const { rowMap } = state
    const { disableCheckRows } = getters

    if (!rowMap.has(key)) return

    const row = rowMap.get(key)!
    const checked = row.checked
    const partial = row.partial

    const loop = Array.from(row.children)

    let currentRow

    while (loop.length) {
      currentRow = loop.shift()!

      if (disableCheckRows.has(currentRow.key)) continue

      currentRow.checked = checked
      currentRow.partial = partial

      if (currentRow.children?.length) {
        loop.push(...currentRow.children)
      }
    }
  }

  function computeChecked(key: Key) {
    const { rowMap, rowData } = state
    const { disableCheckRows } = getters

    if (!rowMap.has(key)) return

    const rowList = [rowMap.get(key)!].concat(
      // 需要包含被禁用且被勾选的节点
      rowData.filter(row => disableCheckRows.has(row.key) && row.checked)
    )

    for (let i = 0, len = rowList.length; i < len; ++i) {
      updateCheckedUpward(rowList[i].key)
      updateCheckedDown(rowList[i].key)
    }
  }

  function handleCheck(key: Key, checked: boolean) {
    const { rowMap, noCascaded } = state
    const { disableCheckRows } = getters
    const row = rowMap.get(key)

    if (row && !disableCheckRows.has(key)) {
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

  function clearCheckAll() {
    const { rowData } = state
    const { disableCheckRows } = getters

    for (const row of rowData) {
      if (!disableCheckRows.has(row.key)) {
        row.checked = false
      }
    }

    state.checkedAll = false
    state.partial = false

    computePartial()
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

  function setRenderRows(start: number, end: number) {
    const { startRow, endRow, heightBITree, virtualData } = state

    if (start === startRow && end === endRow) return

    const { processedData } = getters
    virtualData.length = 0

    if (processedData[0]) {
      let i = processedData.length

      while (i--) {
        const data = processedData[i]

        data.hidden = !(i >= start && i < end)
        !data.hidden && virtualData.push(data)
      }

      virtualData.reverse()

      state.padTop = heightBITree?.sum(start) ?? 0
      state.startRow = start
      state.endRow = end
    }
  }

  function handleExpand(key: Key, expanded: boolean) {
    const { rowMap } = state
    const { disableExpandRows } = getters

    if (rowMap.has(key) && !disableExpandRows.has(key)) {
      rowMap.get(key)!.expanded = !!expanded
    }
  }

  function handleTreeExpand(key: Key, expanded: boolean) {
    if (!usingTree.value) return

    const { rowMap, rowData } = state
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
  }

  function toggleFilterItemActive(options: {
    key: Key,
    value: number | string | null,
    active?: boolean,
    disableOthers?: boolean
  }) {
    const { key, value, active = false, disableOthers = false } = options

    if (state.filters[key]) {
      const filterOptions = state.filters[key].options

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
    const { heightBITree, currentPage, pageSize, rowData } = state

    if (heightBITree) {
      if (currentPage && pageSize > 0 && pageSize < rowData.length) {
        state.totalHeight =
          heightBITree.sum(currentPage * pageSize) - heightBITree.sum((currentPage - 1) * pageSize)
      } else {
        state.totalHeight = heightBITree.sum() ?? 0
      }
    } else {
      state.totalHeight = 0
    }
  }

  function parseSorter(sorter: boolean | SorterOptions = false): ParsedSorterOptions {
    const raw = typeof sorter === 'boolean' ? { able: sorter } : sorter
    const { able = true, type = null, order = 0, method = null } = raw

    return { able, type, order, method }
  }

  function parseFilter(filter?: FilterOptions | null): ParsedFilterOptions {
    filter = filter || { able: false, options: [] }

    const { able = true, multiple = false, active = null, method = null } = filter
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

    return { able, options: formattedOptions, multiple, active, method }
  }

  function filterData(
    filters: Record<Key, ParsedFilterOptions>,
    data: RowState[],
    isSingle: boolean
  ) {
    const keys = Object.keys(filters)
    const usedFilter: ParsedFilterOptions[] = []
    const filterData: RowState[] = []

    for (let i = 0, len = keys.length; i < len; ++i) {
      const key = keys[i]
      const filter = filters[key]
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
        filterData.push(row)
      }
    }

    return filterData
  }

  function sortData(
    sorters: Record<Key, ParsedSorterOptions>,
    data: RowState[],
    columns: TableColumnOptions[],
    isSingle: boolean
  ) {
    const keys = Object.keys(sorters)
    const usedSorter = []

    for (let i = 0, len = keys.length; i < len; ++i) {
      const key = keys[i] as keyof RowState
      const { able, type, order, method } = sorters[key]

      if (able && type) {
        const column = columns.find(item => item.key === key)
        const accessor = column?.accessor

        usedSorter.push({
          able,
          key,
          order,
          type,
          method: method ?? undefined,
          accessor(row: RowState) {
            if (typeof accessor === 'function') {
              return accessor(row.data, row.index)
            }

            return row.data[key]
          }
        })

        if (isSingle) break
      }
    }

    // 多列排序优先级
    usedSorter.sort((prev, next) => prev.order - next.order)

    return sortByProps(data, usedSorter)
  }

  function pageData(currentPage: number, pageSize: number, data: RowState[]) {
    return pageSize > 0 ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize) : data
  }

  function getParentRow(key: Key) {
    const { rowMap } = state
    const row = rowMap.get(key)

    if (row?.parent) {
      return rowMap.get(row.parent) ?? null
    }

    return null
  }

  type Store = Readonly<{
    state: Readonly<typeof state>,
    getters: Readonly<typeof getters>,
    mutations: Readonly<typeof mutations>
  }>

  return { state, getters, mutations } as Store
}

export type TableStore = ReturnType<typeof useStore>
