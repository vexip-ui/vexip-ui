import { reactive, computed, markRaw } from 'vue'
import { isNull, debounceMinor, toNumber, sortByProps, deepClone, createBITree } from '@vexip-ui/utils'
import { DEFAULT_KEY_FIELD } from './symbol'

import type { TooltipTheme } from '@/components/tooltip'
import type {
  Key,
  Data,
  RowClassFn,
  FilterOptions,
  ParsedFilterOptions,
  SorterOptions,
  ParsedSorterOptions,
  SelectionColumn,
  ExpandColumn,
  ColumnOptions,
  ColumnWithKey,
  RowState,
  StoreOptions,
  StoreState,
  StoreGetters,
  ClassType
} from './symbol'

let indexId = 1

function getIndexId() {
  return `__vtr-${indexId++}`
}

function defaultIndexLabel(index: number) {
  return index + 1
}

export function useStore(options: StoreOptions) {
  const state = reactive<StoreState>({
    columns: [],
    data: [],
    rowClass: '',
    width: 0,
    dataKey: options.dataKey ?? DEFAULT_KEY_FIELD,
    highlight: false,
    currentPage: 1,
    pageSize: 0,
    rowHeight: options.rowHeight ?? 0,
    rowMinHeight: options.rowMinHeight || 36,
    virtual: options.virtual,
    rowDraggable: !!options.rowDraggable,
    emptyText: options.emptyText,
    tooltipTheme: options.tooltipTheme,
    tooltipWidth: options.tooltipWidth,
    singleSorter: options.singleSorter,
    singleFilter: options.singleFilter,
    expandRenderer: options.expandRenderer,

    rowData: [],
    rightFixedColumns: [],
    leftFixedColumns: [],
    dataMap: {},
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
    virtualData: []
  })

  setColumns(state, options.columns)

  setData(state, options.data)
  setCurrentPage(state, options.currentPage)
  setPageSize(state, options.pageSize)

  setRowClass(state, options.rowClass)
  setHighlight(state, options.highlight)
  setVirtual(state, options.virtual)

  const filteredData = computed(() => {
    return filterData(state.filters, state.rowData, state.singleFilter)
  })
  const sortedData = computed(() => {
    return sortData(state.sorters, filteredData.value, state.columns, state.singleSorter)
  })
  const processedData = computed(() => {
    return pageData(state.currentPage, state.pageSize, sortedData.value)
  })
  const totalRowHeight = computed(() => {
    return state.heightBITree?.sum() ?? 0
  })
  const disableCheckRows = computed(() => {
    const rowData = processedData.value
    const selection = state.columns.find(item => (item as SelectionColumn).type === 'selection') as
      | SelectionColumn
      | undefined
    const disableCheckRows: Record<Key, boolean> = {}

    if (selection && typeof selection.disableRow === 'function') {
      const isDisabled = selection.disableRow

      for (let i = 0, len = rowData.length; i < len; ++i) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          disableCheckRows[row.key] = true
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
    const disableExpandRows: Record<Key, boolean> = {}

    if (expand && typeof expand.disableRow === 'function') {
      const isDisabled = expand.disableRow

      for (let i = 0, len = rowData.length; i < len; ++i) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          const key = row.key

          disableExpandRows[key] = true
        }
      }
    }

    return disableExpandRows
  })

  const getters = reactive({
    filteredData,
    sortedData,
    processedData,
    totalRowHeight,
    disableCheckRows,
    disableExpandRows
  })

  const mutations = {
    // 这两个方法被 deep watch 回调
    // 需要防止在一个微任务内被多次调用
    setColumns: debounceMinor(setColumns.bind(null, state)),
    setData: debounceMinor(setData.bind(null, state)),

    setDataKey: setDataKey.bind(null, state),
    setCurrentPage: setCurrentPage.bind(null, state),
    setPageSize: setPageSize.bind(null, state),
    setRowClass: setRowClass.bind(null, state),
    setTableWidth: setTableWidth.bind(null, state),
    setColumnWidth: setColumnWidth.bind(null, state),
    setRowHeight: setRowHeight.bind(null, state),
    setBorderHeight: setBorderHeight.bind(null, state),
    setGlobalRowHeight: setGlobalRowHeight.bind(null, state),
    setMinRowHeight: setMinRowHeight.bind(null, state),
    setVirtual: setVirtual.bind(null, state),
    setRowDraggable: setRowDraggable.bind(null, state),
    setRowExpandHeight: setRowExpandHeight.bind(null, state),
    setBodyScroll: setBodyScroll.bind(null, state),
    setHighlight: setHighlight.bind(null, state),
    setRowHover: setRowHover.bind(null, state),
    setEmptyText: setEmptyText.bind(null, state),
    setTooltipTheme: setTooltipTheme.bind(null, state),
    setTooltipWidth: setTooltipWidth.bind(null, state),
    setSingleSorter: setSingleSorter.bind(null, state),
    setSingleFilter: setSingleFilter.bind(null, state),
    setDragging: setDragging.bind(null, state),
    handleSort: handleSort.bind(null, state),
    clearSort: clearSort.bind(null, state),
    handleFilter: handleFilter.bind(null, state),
    clearFilter: clearFilter.bind(null, state),
    toggleFilterItemActive: toggleFilterItemActive.bind(null, state),
    refreshRowIndex: refreshRowIndex.bind(null, state),

    handleCheck: handleCheck.bind(null, state, getters),
    handleCheckAll: handleCheckAll.bind(null, state, getters),
    clearCheckAll: clearCheckAll.bind(null, state, getters),
    setRenderRows: setRenderRows.bind(null, state, getters),
    handleExpand: handleExpand.bind(null, state, getters)
  }

  type Store = Readonly<{
    state: Readonly<typeof state>,
    getters: Readonly<typeof getters>,
    mutations: Readonly<typeof mutations>
  }>

  return { state, getters, mutations } as Store
}

export type TableStore = ReturnType<typeof useStore>

function setColumns(state: StoreState, columns: ColumnOptions[]) {
  columns = Array.from(columns).sort((prev, next) => {
    return (prev.order || 0) - (next.order || 0)
  })

  const { widths, sorters, filters } = state

  const normalColumns = []
  const rightFixedColumns = []
  const leftFixedColumns = []
  const columnTypes = ['order', 'selection', 'expand']

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
    }

    let key = column.key

    if (isNull(key)) {
      key = getIndexId()

      console.error('[Vexip warn] Table column requires key prop, but missing')
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

function setDataKey(state: StoreState, field: string) {
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

function setData(state: StoreState, data: Data[]) {
  const clonedData = []
  const dataMap: Record<Key, RowState> = {}
  const { dataKey, idMaps } = state
  const oldDataMap = state.dataMap
  const hidden = !!state.virtual

  for (let i = 0, len = data.length; i < len; ++i) {
    const item = data[i]

    let key = item[dataKey] as Key

    if (isNull(key)) {
      key = idMaps.get(item)!

      if (isNull(key)) {
        key = getIndexId()
      }
    }

    let row: RowState

    if (oldDataMap[key]) {
      row = oldDataMap[key]
    } else {
      const { checked, height, expanded } = item

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
        data: item
      }

      idMaps.set(item, key)
    }

    // 行的初始位置索引
    row.index = i
    clonedData.push(row)
    dataMap[key] = row
  }

  if (!state.heightBITree || clonedData.length !== state.rowData.length) {
    state.heightBITree = markRaw(createBITree(clonedData.length, (state.rowHeight || state.rowMinHeight) + 1))
  }

  state.rowData = clonedData
  state.dataMap = dataMap

  computePartial(state)
}

function setCurrentPage(state: StoreState, currentPage: number) {
  state.currentPage = currentPage ?? 1
}

function setPageSize(state: StoreState, pageSize: number) {
  state.pageSize = pageSize || state.rowData.length
}

function setRowClass(state: StoreState, rowClass: ClassType | RowClassFn) {
  state.rowClass = rowClass ?? ''
}

function setTableWidth(state: StoreState, width: number) {
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

function setColumnWidth(state: StoreState, key: Key, width: number) {
  if (state.widths[key]) {
    state.widths[key] = width
  }
}

function setRowHeight(state: StoreState, key: Key, height: number) {
  if (state.dataMap[key] && state.dataMap[key].height !== height) {
    state.dataMap[key].height = height
  }
}

function setBorderHeight(state: StoreState, key: Key, height: number) {
  if (state.dataMap[key]) {
    state.dataMap[key].borderHeight = height
  }
}

function setGlobalRowHeight(state: StoreState, height: number) {
  state.rowHeight = height
}

function setMinRowHeight(state: StoreState, height: number) {
  state.rowMinHeight = height
}

function setRowDraggable(state: StoreState, draggable: boolean) {
  state.rowDraggable = !!draggable
}

function setRowExpandHeight(state: StoreState, key: Key, height: number) {
  if (state.dataMap[key]) {
    state.dataMap[key].expandHeight = height
  }
}

function setBodyScroll(state: StoreState, scroll: number) {
  state.bodyScroll = scroll
}

function setHighlight(state: StoreState, able: boolean) {
  state.highlight = !!able
}

function setVirtual(state: StoreState, virtual: boolean) {
  state.virtual = !!virtual
}

function setRowHover(state: StoreState, key: Key, hover: boolean) {
  if (state.dataMap[key]) {
    state.dataMap[key].hover = hover
  }
}

function setEmptyText(state: StoreState, text: string) {
  state.emptyText = text
}

function setTooltipTheme(state: StoreState, theme: TooltipTheme) {
  state.tooltipTheme = theme
}

function setTooltipWidth(state: StoreState, theme: number | string) {
  state.tooltipWidth = theme
}

function setSingleSorter(state: StoreState, able: boolean) {
  state.singleSorter = !!able
}

function setSingleFilter(state: StoreState, able: boolean) {
  state.singleFilter = !!able
}

function setDragging(state: StoreState, dragging: boolean) {
  state.dragging = !!dragging
}

function handleSort(state: StoreState, key: Key, type: ParsedSorterOptions['type']) {
  if (state.sorters[key]) {
    if (state.singleSorter && type) {
      clearSort(state)
    }

    state.sorters[key].type = type
  }
}

function clearSort(state: StoreState) {
  const sorters = state.sorters

  Object.keys(sorters).forEach(key => {
    sorters[key].type = null
  })
}

function handleFilter(state: StoreState, key: Key, active: ParsedFilterOptions['active']) {
  if (state.filters[key]) {
    if (state.singleFilter && (Array.isArray(active) ? active.length : active)) {
      clearFilter(state)
    }

    state.filters[key].active = active
  }
}

function clearFilter(state: StoreState) {
  const filters = state.filters

  Object.keys(filters).forEach(key => {
    filters[key].active = null
  })
}

function handleCheck(state: StoreState, getters: StoreGetters, key: Key, checked: boolean) {
  const { dataMap } = state
  const { disableCheckRows } = getters

  if (dataMap[key] && !disableCheckRows[key]) {
    dataMap[key].checked = !!checked
  }

  computePartial(state)
}

function handleCheckAll(state: StoreState, getters: StoreGetters) {
  const { rowData, checkedAll } = state
  const { disableCheckRows } = getters

  let checked = !checkedAll

  // 阻断 disabled 元素对全选的影响
  if (Object.keys(disableCheckRows).length) {
    // 由于被禁用的元素不可被操作，如果存在被禁用的元素且该状态为未被选中，则全选时仍然是 partial 状态
    // 假设除了禁用的元素，其余元素均为选中状态（此时对于用户来说属于已经全选，点击的期望是取消全选）
    let partialCheckedAll = true

    for (const row of rowData) {
      // 检查是否存在非禁用的且未被选中的元素（如有则证明现在不是全选，用户点击的期望是进行全选）
      if (!disableCheckRows[row.key] && !row.checked) {
        partialCheckedAll = false

        break
      }
    }

    checked = !partialCheckedAll
  }

  for (const row of rowData) {
    if (!disableCheckRows[row.key]) {
      row.checked = checked
    }
  }

  state.checkedAll = checked
  state.partial = false

  computePartial(state)
}

function clearCheckAll(state: StoreState, getters: StoreGetters) {
  const { rowData } = state
  const { disableCheckRows } = getters

  for (const row of rowData) {
    if (!disableCheckRows[row.key]) {
      row.checked = false
    }
  }

  state.checkedAll = false
  state.partial = false

  computePartial(state)
}

function computePartial(state: StoreState) {
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

function setRenderRows(state: StoreState, getters: StoreGetters, start: number, end: number) {
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

    state.padTop = heightBITree.sum(start)
    state.startRow = start
    state.endRow = end
  }
}

function handleExpand(state: StoreState, getters: StoreGetters, key: Key, expanded: boolean) {
  const { dataMap } = state
  const { disableExpandRows } = getters

  if (dataMap[key] && !disableExpandRows[key]) {
    dataMap[key].expanded = !!expanded
  }
}

function toggleFilterItemActive(
  state: StoreState,
  options: { key: Key, value: number | string | null, active?: boolean, disableOthers?: boolean }
) {
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

function refreshRowIndex(state: StoreState) {
  const data = state.rowData

  for (let i = 0, len = data.length; i < len; ++i) {
    data[i].index = i
  }
}

function parseSorter(sorter: boolean | SorterOptions = false): ParsedSorterOptions {
  const raw = typeof sorter === 'boolean' ? { able: sorter } : sorter
  const { able = false, type = null, order = 0, method = null } = raw

  return { able, type, order, method }
}

function parseFilter(filter: FilterOptions = { able: false, options: [] }): ParsedFilterOptions {
  const { able = false, multiple = false, active = null, method = null } = filter
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

function filterData(filters: Record<Key, ParsedFilterOptions>, data: RowState[], isSingle: boolean) {
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
  columns: ColumnOptions[],
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
  return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}
