import { reactive, computed } from 'vue'
import { isNull } from '@/common/utils/common'
import { debounceMinor } from '@/common/utils/performance'
import { toNumber } from '@/common/utils/number'
import { sortByProps } from '@/common/utils/transform'
import { deepClone } from '@/common/utils/deep-clone'
import { ClassType, DEFAULT_KEY_FIELD } from './symbol'

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
  StoreGetters
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
    renderCount: 0,
    currentPage: 1,
    pageSize: 0,
    rowHeight: options.rowHeight ?? 0,
    rowDraggable: !!options.rowDraggable,
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
    hiddenHeight: 0,
    startRow: 0,
    endRow: 0
  })

  setColumns(state, options.columns)

  setData(state, options.data)
  setCurrentPage(state, options.currentPage)
  setPageSize(state, options.pageSize)

  setRowClass(state, options.rowClass)
  setHighlight(state, options.highlight)
  setRenderCount(state, options.renderCount)

  const filteredData = computed(() => {
    return filterData(state.filters, state.rowData)
  })
  const processedData = computed(() => {
    const { sorters, columns, currentPage, pageSize } = state

    return pageData(currentPage, pageSize, sortData(sorters, filteredData.value, columns))
  })
  const totalRowHeight = computed(() => {
    const data = processedData.value

    let i = data.length
    let total = 0

    while (i--) {
      const { height, borderHeight, expandHeight } = data[i]

      total += (borderHeight || 0) + (height || 0) + (expandHeight || 0)
    }

    return total
  })
  const disableCheckRows = computed(() => {
    const { columns, rowData } = state
    const selection = columns.find(item => (item as SelectionColumn).type === 'selection') as
      | SelectionColumn
      | undefined
    const disableCheckRows: Record<Key, boolean> = {}

    if (selection && typeof selection.disableRow === 'function') {
      const isDisabled = selection.disableRow

      for (let i = 0, len = rowData.length; i < len; i++) {
        const row = rowData[i]

        if (isDisabled(row.data)) {
          const key = row.key

          disableCheckRows[key] = true
        }
      }
    }

    return disableCheckRows
  })
  const disableExpandRows = computed(() => {
    const { columns, rowData } = state
    const expand = columns.find(item => (item as ExpandColumn).type === 'expand') as
      | ExpandColumn
      | undefined
    const disableExpandRows: Record<Key, boolean> = {}

    if (expand && typeof expand.disableRow === 'function') {
      const isDisabled = expand.disableRow

      for (let i = 0, len = rowData.length; i < len; i++) {
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
    setRowDraggable: setRowDraggable.bind(null, state),
    setRowExpandHeight: setRowExpandHeight.bind(null, state),
    setBodyScroll: setBodyScroll.bind(null, state),
    setHighlight: setHighlight.bind(null, state),
    setRenderCount: setRenderCount.bind(null, state),
    setRowHover: setRowHover.bind(null, state),
    handleSort: handleSort.bind(null, state),
    handleFilter: handleFilter.bind(null, state),
    toggleFilterItemActive: toggleFilterItemActive.bind(null, state),
    refreshRowIndex: refreshRowIndex.bind(null, state),

    handleCheck: handleCheck.bind(null, state, getters),
    handleCheckAll: handleCheckAll.bind(null, state, getters),
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

  for (let i = 0, len = columns.length; i < len; i++) {
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
      let key = row.data[field] as Key | undefined

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
  const hidden = !!state.renderCount

  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]

    let key = item[dataKey] as Key | undefined

    if (isNull(key)) {
      key = idMaps.get(item)

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

  for (let i = 0, len = columns.length; i < len; i++) {
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

  for (let i = 0; i < flexColumnCount; i++) {
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
  if (state.dataMap[key]) {
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

function setRenderCount(state: StoreState, count: number) {
  state.renderCount = parseInt(count as any) || 0
}

function setRowHover(state: StoreState, key: Key, hover: boolean) {
  if (state.dataMap[key]) {
    state.dataMap[key].hover = hover
  }
}

function handleSort(state: StoreState, key: Key, type: ParsedSorterOptions['type']) {
  if (state.sorters[key]) {
    state.sorters[key].type = type
  }
}

function handleFilter(state: StoreState, key: Key, active: ParsedFilterOptions['active']) {
  if (state.filters[key]) {
    state.filters[key].active = active
  }
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
    let partialCheckedAll = true

    for (let i = 0, len = rowData.length; i < len; i++) {
      const row = rowData[i]

      if (!disableCheckRows[row.key] && !row.checked) {
        partialCheckedAll = false

        break
      }
    }

    checked = !partialCheckedAll
  }

  for (let i = 0, len = rowData.length; i < len; i++) {
    const row = rowData[i]

    if (!disableCheckRows[row.key]) {
      row.checked = checked
    }
  }

  state.checkedAll = checked
  state.partial = false

  computePartial(state)
}

function setRenderRows(state: StoreState, getters: StoreGetters, start: number, end: number) {
  const { startRow, endRow } = state

  if (start === startRow && end === endRow) return

  const { processedData } = getters

  if (processedData[0]) {
    let i = processedData.length

    while (i--) {
      processedData[i].hidden = !(i >= start && i < end)
    }

    state.hiddenHeight = start * processedData[0].height
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
      for (let i = 0, len = filterOptions.length; i < len; i++) {
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

  for (let i = 0, len = data.length; i < len; i++) {
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

  for (let i = 0, len = options.length; i < len; i++) {
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

function computePartial(state: StoreState) {
  const data = state.rowData

  let hasChecked = false
  let hasNotChecked = false
  let partial = false

  for (let i = 0, len = data.length; i < len; i++) {
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

function filterData(filters: Record<Key, ParsedFilterOptions>, data: RowState[]) {
  const keys = Object.keys(filters)
  const usedFilter: ParsedFilterOptions[] = []
  const filterData: RowState[] = []

  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    const filter = filters[key]
    const { able, active, method } = filter

    if (able && active && typeof method === 'function') {
      usedFilter.push(filter)
    }
  }

  const usedFilterCount = usedFilter.length

  for (let i = 0, len = data.length; i < len; i++) {
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
  columns: ColumnOptions[]
) {
  const keys = Object.keys(sorters)
  const usedSorter = []

  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
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
    }
  }

  // 多列排序优先级
  usedSorter.sort((prev, next) => prev.order - next.order)

  return sortByProps(data, usedSorter)
}

function pageData(currentPage: number, pageSize: number, data: RowState[]) {
  return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}
