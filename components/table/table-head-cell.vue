<template>
  <div
    ref="wrapper"
    :class="className"
    role="columnheader"
    scope="col"
    :colspan="headSpan !== 1 ? headSpan : undefined"
    :style="style"
    :aria-sort="
      sorter.able
        ? sorter.type
          ? sorter.type === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
        : undefined
    "
    v-bind="attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
    @transitionend="refreshXScroll"
  >
    <Checkbox
      v-if="isSelection(column)"
      inherit
      control
      :class="nh.be('selection')"
      :checked="checkedAll"
      :partial="partial"
      :disabled="checkboxDisabled"
      :size="column.checkboxSize || 'default'"
      @click.prevent="handleCheckAllRow"
    ></Checkbox>
    <template v-else>
      <Renderer
        v-if="isFunction(column.headRenderer)"
        :renderer="column.headRenderer"
        :data="{ column, index }"
      ></Renderer>
      <template v-else>
        {{ column.name }}
      </template>
    </template>
    <div v-if="sorter.able" :class="nh.be('sorter')">
      <span
        :class="{
          [nh.bem('sorter', 'asc')]: true,
          [nh.bem('sorter', 'active')]: sorter.type === 'asc'
        }"
        @click="handleSortAsc()"
      >
        <Icon v-bind="icons.caretUp"></Icon>
      </span>
      <span
        :class="{
          [nh.bem('sorter', 'desc')]: true,
          [nh.bem('sorter', 'active')]: sorter.type === 'desc'
        }"
        @click="handleSortDesc()"
      >
        <Icon v-bind="icons.caretDown"></Icon>
      </span>
    </div>
    <template v-if="filter.able">
      <Renderer
        v-if="isFunction(column.filterRenderer)"
        :renderer="column.filterRenderer"
        :data="{ column, index, filter, handleFilter }"
      ></Renderer>
      <Tooltip
        v-else
        v-model:visible="filterVisible"
        transfer
        placement="bottom"
        trigger="click"
        :class="{
          [nh.be('filter')]: true,
          [nh.bem('filter', 'visible')]: filterVisible,
          [nh.bem('filter', 'active')]: filter.active
        }"
        :tip-class="{
          [nh.be('filter-wrapper')]: true,
          [nh.bs('vars')]: true,
          [nh.bem('filter-wrapper', 'multiple')]: filter.multiple
        }"
      >
        <template #trigger>
          <div :class="nh.be('filter-trigger')">
            <Icon v-bind="icons.filter"></Icon>
          </div>
        </template>
        <template v-if="filter.multiple" #default>
          <div vertical :class="nh.be('filter-group')">
            <Checkbox
              v-for="item in filter.options"
              :key="item.value"
              inherit
              :checked="item.active"
              :label="item.label"
              :value="item.value"
              @change="handleFilterCheck(item.value, $event)"
            ></Checkbox>
          </div>
          <div :class="nh.be('filter-actions')">
            <Button
              inherit
              text
              size="small"
              :disabled="!hasFilterActive"
              @click="handleFilterMultiple()"
            >
              {{ locale.filterConfirm }}
            </Button>
            <Button
              inherit
              text
              size="small"
              @click="handleResetFilter"
            >
              {{ locale.filterReset }}
            </Button>
          </div>
        </template>
        <template v-else #default>
          <div
            :class="{
              [nh.be('filter-item')]: true,
              [nh.bem('filter-item', 'active')]: !filter.active
            }"
            @click="handleResetFilter"
          >
            {{ locale.filterAll }}
          </div>
          <div
            v-for="item in filter.options"
            :key="item.value"
            :class="{
              [nh.be('filter-item')]: true,
              [nh.bem('filter-item', 'active')]: item.active
            }"
            @click="handleFilterItemSelect(item.value, !item.active)"
          >
            {{ item.label }}
          </div>
        </template>
      </Tooltip>
    </template>
    <div v-if="resizable && !column.last" ref="resizer" :class="nh.be('resizer')"></div>
  </div>
</template>

<script lang="ts">
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Tooltip } from '@/components/tooltip'

import { computed, defineComponent, inject, ref, toRef } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { boundRange, isFunction, nextFrameOnce } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_STORE } from './symbol'

import type { PropType } from 'vue'
import type {
  ColumnWithKey,
  ParsedFilterOptions,
  ParsedTableSorterOptions,
  TableSelectionColumn,
  TableTypeColumn
} from './symbol'

const columnTypes = ['order', 'selection', 'expand']

export default defineComponent({
  name: 'TableHeadCell',
  components: {
    Button,
    Checkbox,
    Icon,
    Renderer,
    Tooltip
  },
  props: {
    column: {
      type: Object as PropType<ColumnWithKey>,
      default: () => ({})
    },
    index: {
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
    const filterVisible = ref(false)
    const resizable = toRef(state, 'colResizable')
    const resizing = computed(() => state.colResizing)

    const wrapper = ref<HTMLElement>()

    let currentWidth = 0

    const headSpan = computed(() => {
      const fixed = props.fixed || 'default'

      if (state.collapseMap.get(fixed)!.has(`-1,${props.index}`)) {
        return 0
      }

      const columns =
        fixed === 'left'
          ? state.leftFixedColumns
          : fixed === 'right'
            ? state.rightFixedColumns
            : state.columns

      const colSpan = boundRange(props.column.headSpan ?? 1, 0, columns.length - props.index)

      mutations.updateCellSpan(-1, props.index, fixed, { colSpan, rowSpan: 1 })

      return colSpan
    })

    const { target: resizer } = useMoving({
      capture: false,
      onStart: (state, event) => {
        if (!resizable.value || resizing.value || !headSpan.value) return false

        const table = tableActions.getTableElement()

        if (!table || !wrapper.value) return false

        state.xStart = state.clientX - table.getBoundingClientRect().left
        currentWidth = wrapper.value.getBoundingClientRect().width

        mutations.setColumnResizing(true)
        mutations.setResizeLeft(state.xStart)
        tableActions.emitColResize('Start', { ...buildEventPayload(event), width: currentWidth })
      },
      onMove: (state, event) => {
        mutations.setResizeLeft(state.xEnd)
        tableActions.emitColResize('Move', {
          ...buildEventPayload(event),
          width: currentWidth + state.deltaX
        })
      },
      onEnd: ({ deltaX }, event) => {
        mutations.setColumnResizing(false)

        if (!wrapper.value) return

        const width = wrapper.value.getBoundingClientRect().width + deltaX

        mutations.handleColumnResize(
          state.columns.slice(props.index, props.index + headSpan.value).map(column => column.key),
          width
        )
        tableActions.emitColResize('End', { ...buildEventPayload(event), width })
      }
    })

    const className = computed(() => {
      let customClass = null

      if (typeof state.headClass === 'function') {
        customClass = state.headClass({ column: props.column, index: props.index })
      } else {
        customClass = state.headClass
      }

      return [
        nh.be('head-cell'),
        {
          [nh.bem('head-cell', 'center')]:
            columnTypes.includes((props.column as TableTypeColumn).type) ||
            props.column.textAlign === 'center',
          [nh.bem('head-cell', 'right')]: props.column.textAlign === 'right',
          [nh.bem('head-cell', 'wrap')]: props.column.noEllipsis,
          [nh.bem('head-cell', 'last')]: props.column.last
        },
        props.column.className,
        props.column.class,
        customClass
      ]
    })
    const style = computed(() => {
      const span = headSpan.value
      const totalWidths =
        props.fixed === 'left'
          ? getters.leftFixedWidths
          : props.fixed === 'right'
            ? getters.rightFixedWidths
            : getters.totalWidths
      const width = totalWidths[props.index + span] - totalWidths[props.index]
      const padLeft = props.fixed !== 'right' ? state.sidePadding[0] || 0 : 0

      let customStyle

      if (typeof state.headStyle === 'function') {
        customStyle = state.headStyle({ column: props.column, index: props.index })
      } else {
        customStyle = state.headStyle
      }

      return [
        props.column.style || '',
        customStyle,
        {
          display: !span ? 'none' : undefined,
          width: `${width}px`,
          visibility: props.column.fixed && !props.fixed ? 'hidden' : undefined,
          borderRightWidth:
            !state.border && span > 1 && props.index + span >= totalWidths.length - 1
              ? 0
              : undefined,
          transform: `translate3d(${padLeft + totalWidths[props.index]}px, 0, 0)`
        }
      ]
    })
    const attrs = computed(() => {
      let customAttrs: Record<string, any>

      if (typeof state.headAttrs === 'function') {
        customAttrs = state.headAttrs({ column: props.column, index: props.index })
      } else {
        customAttrs = state.headAttrs
      }

      return { ...(props.column.attrs || {}), ...(customAttrs || {}) }
    })
    const sorter = computed(() => {
      return state.sorters.get(props.column.key) || ({} as ParsedTableSorterOptions)
    })
    const filter = computed(() => {
      return state.filters.get(props.column.key) || ({} as ParsedFilterOptions)
    })
    const hasFilterActive = computed(() => {
      const options = filter.value.options ?? []

      for (let i = 0, len = options.length; i < len; ++i) {
        if (options[i].active) {
          return true
        }
      }

      return false
    })
    const checkboxDisabled = computed(() => {
      if (!isSelection(props.column)) {
        return false
      }

      const records = Object.values(getters.disableCheckRows)

      return (
        getters.processedData.length === records.length &&
        !Object.values(getters.disableCheckRows).includes(false)
      )
    })

    function isSelection(column: unknown): column is TableSelectionColumn {
      return (column as TableTypeColumn).type === 'selection'
    }

    function buildEventPayload(event: Event) {
      return {
        column: props.column,
        index: props.index,
        event
      }
    }

    function handleMouseEnter(event: MouseEvent) {
      tableActions?.emitHeadEvent('Enter', buildEventPayload(event))
    }

    function handleMouseLeave(event: MouseEvent) {
      tableActions?.emitHeadEvent('Leave', buildEventPayload(event))
    }

    function handleClick(event: MouseEvent) {
      tableActions?.emitHeadEvent('Click', buildEventPayload(event))
    }

    function handleDblclick(event: MouseEvent) {
      tableActions?.emitHeadEvent('Dblclick', buildEventPayload(event))
    }

    function handleContextmenu(event: MouseEvent) {
      tableActions?.emitHeadEvent('Contextmenu', buildEventPayload(event))
    }

    function handleSortAsc() {
      const key = props.column.key
      const type = sorter.value.type === 'asc' ? null : 'asc'

      mutations.handleSort(key, type)
      tableActions.emitRowSort()
    }

    function handleSortDesc() {
      const key = props.column.key
      const type = sorter.value.type === 'desc' ? null : 'desc'

      mutations.handleSort(key, type)
      tableActions.emitRowSort()
    }

    function handleFilter(value: ParsedFilterOptions['active']) {
      mutations.handleFilter(props.column.key, value)
    }

    function handleFilterItemSelect(value: string | number, active: boolean) {
      mutations.toggleFilterItemActive({
        key: props.column.key,
        value,
        active,
        disableOthers: true
      })
      handleFilter(value)
      filterVisible.value = false
      tableActions.emitRowFilter()
    }

    function handleFilterCheck(value: string | number, checked: boolean) {
      mutations.toggleFilterItemActive({
        key: props.column.key,
        value,
        active: checked
      })
    }

    function handleFilterMultiple() {
      const options = filter.value.options ?? []
      const activeValues = []

      for (let i = 0, len = options.length; i < len; ++i) {
        const option = options[i]

        if (option.active) {
          activeValues.push(option.value)
        }
      }

      handleFilter(activeValues)
      filterVisible.value = false
      tableActions.emitRowFilter()
    }

    function handleResetFilter() {
      filterVisible.value = false
      handleFilter(null)
      mutations.toggleFilterItemActive({
        key: props.column.key,
        value: null,
        disableOthers: true
      })
      tableActions.emitRowFilter()
    }

    function handleCheckAllRow() {
      mutations.handleCheckAll()
      tableActions.emitAllRowCheck(state.checkedAll, state.partial)
    }

    return {
      nh,
      locale: toRef(state, 'locale'),
      icons: useIcons(),
      filterVisible,
      checkedAll: toRef(state, 'checkedAll'),
      partial: toRef(state, 'partial'),
      resizable,

      className,
      headSpan,
      style,
      attrs,
      sorter,
      filter,
      hasFilterActive,
      checkboxDisabled,

      wrapper,
      resizer,

      isFunction,
      isSelection,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleDblclick,
      handleContextmenu,
      handleSortAsc,
      handleSortDesc,
      handleFilter,
      handleFilterItemSelect,
      handleFilterCheck,
      handleFilterMultiple,
      handleResetFilter,
      handleCheckAllRow,
      refreshXScroll: () => nextFrameOnce(tableActions.refreshXScroll)
    }
  }
})
</script>
