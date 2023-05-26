<template>
  <div
    ref="wrapper"
    :class="className"
    role="columnheader"
    :style="style"
    :aria-sort="sorter.type ? (sorter.type === 'asc' ? 'ascending' : 'descending') : 'none'"
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
  </div>
</template>

<script lang="ts">
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Tooltip } from '@/components/tooltip'

import { computed, defineComponent, inject, onMounted, ref, toRef } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
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
    }
  },
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableAction = inject(TABLE_ACTIONS)!

    const nh = useNameHelper('table')
    const filterVisible = ref(false)

    const wrapper = ref<HTMLElement>()

    const className = computed(() => {
      let customClass = null

      if (typeof state.headClass === 'function') {
        customClass = state.headClass(props.column, props.index)
      } else {
        customClass = state.headClass
      }

      return [
        nh.be('head-cell'),
        {
          [nh.bem('head-cell', 'center')]:
            columnTypes.includes((props.column as TableTypeColumn).type) ||
            props.column.textAlign === 'center',
          [nh.bem('head-cell', 'right')]: props.column.textAlign === 'right'
        },
        props.column.className || null,
        props.column.class || null,
        customClass
      ]
    })
    const style = computed(() => {
      const width = state.widths.get(props.column.key) || 0

      let customStyle

      if (typeof state.headStyle === 'function') {
        customStyle = state.headStyle(props.column, props.index)
      } else {
        customStyle = state.headStyle
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

      if (typeof state.headAttrs === 'function') {
        customAttrs = state.headAttrs(props.column, props.index)
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

    onMounted(() => {
      setTimeout(() => {
        if (wrapper.value) {
          mutations.setColumnWidth(props.column.key, wrapper.value.getBoundingClientRect().width)
        }
      }, 0)
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
      if (tableAction) {
        tableAction.emitHeadEnter(buildEventPayload(event))
      }
    }

    function handleMouseLeave(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitHeadLeave(buildEventPayload(event))
      }
    }

    function handleClick(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitHeadClick(buildEventPayload(event))
      }
    }

    function handleDblclick(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitHeadDblclick(buildEventPayload(event))
      }
    }

    function handleContextmenu(event: MouseEvent) {
      if (tableAction) {
        tableAction.emitHeadContextmenu(buildEventPayload(event))
      }
    }

    function handleSortAsc() {
      const key = props.column.key
      const type = sorter.value.type === 'asc' ? null : 'asc'

      mutations.handleSort(key, type)
      tableAction.emitRowSort()
    }

    function handleSortDesc() {
      const key = props.column.key
      const type = sorter.value.type === 'desc' ? null : 'desc'

      mutations.handleSort(key, type)
      tableAction.emitRowSort()
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
      tableAction.emitRowFilter()
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
      tableAction.emitRowFilter()
    }

    function handleResetFilter() {
      filterVisible.value = false
      handleFilter(null)
      mutations.toggleFilterItemActive({
        key: props.column.key,
        value: null,
        disableOthers: true
      })
      tableAction.emitRowFilter()
    }

    function handleCheckAllRow() {
      mutations.handleCheckAll()
      tableAction.emitAllRowCheck(state.checkedAll, state.partial)
    }

    return {
      nh,
      locale: toRef(state, 'locale'),
      icons: useIcons(),
      filterVisible,
      checkedAll: toRef(state, 'checkedAll'),
      partial: toRef(state, 'partial'),

      className,
      style,
      attrs,
      sorter,
      filter,
      hasFilterActive,
      checkboxDisabled,

      wrapper,

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
      handleCheckAllRow
    }
  }
})
</script>
