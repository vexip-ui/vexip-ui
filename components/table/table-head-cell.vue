<template>
  <div ref="wrapper" :class="className" :style="style">
    <Checkbox
      v-if="isSelection(column)"
      control
      :class="`${prefix}__selection`"
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
    <div v-if="sorter.able" :class="`${prefix}__sorter`">
      <span
        :class="{
          [`${prefix}__sorter--asc`]: true,
          [`${prefix}__sorter--active`]: sorter.type === 'asc'
        }"
        @click="handleSortAsc()"
      >
        <Icon><CaretUp></CaretUp></Icon>
      </span>
      <span
        :class="{
          [`${prefix}__sorter--desc`]: true,
          [`${prefix}__sorter--active`]: sorter.type === 'desc'
        }"
        @click="handleSortDesc()"
      >
        <Icon><CaretDown></CaretDown></Icon>
      </span>
    </div>
    <Tooltip
      v-if="filter.able"
      v-model:visible="filterVisible"
      transfer
      placement="bottom"
      trigger="click"
      :class="{
        [`${prefix}__filter`]: true,
        [`${prefix}__filter--visible`]: filterVisible,
        [`${prefix}__filter--active`]: filter.active
      }"
      :tip-class="{
        [`${prefix}__filter-wrapper`]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}__filter-wrapper--multiple`]: filter.multiple
      }"
    >
      <div :class="`${prefix}__filter-trigger`">
        <Icon><Filter></Filter></Icon>
      </div>
      <template v-if="filter.multiple" #tip>
        <div vertical :class="`${prefix}__filter-group`">
          <Checkbox
            v-for="item in filter.options"
            :key="item.value"
            :checked="item.active"
            :label="item.label"
            :value="item.value"
            @change="handleFilterCheck(item.value, $event)"
          ></Checkbox>
        </div>
        <div :class="`${prefix}__filter-actions`">
          <Button
            type="text"
            size="small"
            :disabled="!hasFilterActive"
            @click="handleFilterMutiple()"
          >
            {{ locale.filterConfirm }}
          </Button>
          <Button type="text" size="small" @click="handleResetFilter">
            {{ locale.filterReset }}
          </Button>
        </div>
      </template>
      <template v-else #tip>
        <div
          :class="{
            [`${prefix}__filter-item`]: true,
            [`${prefix}__filter-item--active`]: !filter.active
          }"
          @click="handleResetFilter"
        >
          {{ locale.filterAll }}
        </div>
        <div
          v-for="item in filter.options"
          :key="item.value"
          :class="{
            [`${prefix}__filter-item`]: true,
            [`${prefix}__filter-item--active`]: item.active
          }"
          @click="handleFilterItemSelect(item.value, !item.active)"
        >
          {{ item.label }}
        </div>
      </template>
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, onMounted, toRef } from 'vue'
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Tooltip } from '@/components/tooltip'
import { useLocaleConfig } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { CaretUp, CaretDown, Filter } from '@vexip-ui/icons'
import { TABLE_STORE, TABLE_ACTION } from './symbol'

import type { PropType } from 'vue'
import type { SelectionColumn, TypeColumn, ColumnWithKey } from './symbol'

const columnTypes = ['order', 'selection', 'expand']

const props = {
  column: {
    type: Object as PropType<ColumnWithKey>,
    default: () => ({})
  },
  index: {
    type: Number,
    required: true
  }
}

export default defineComponent({
  name: 'TableHeadCell',
  components: {
    Button,
    Checkbox,
    Icon,
    Renderer,
    Tooltip,
    CaretUp,
    CaretDown,
    Filter
  },
  props,
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableAction = inject(TABLE_ACTION)!

    const prefix = 'vxp-table'
    const filterVisible = ref(false)

    const wrapper = ref<HTMLElement | null>(null)

    const className = computed(() => {
      const customClass = props.column.className || null

      return [
        `${prefix}__head-cell`,
        {
          [`${prefix}__head-cell--center`]: columnTypes.includes((props.column as TypeColumn).type)
        },
        customClass
      ]
    })
    const style = computed(() => {
      const width = state.widths[props.column.key]

      return {
        flex: `${width} 0 auto`,
        width: `${props.column.width ?? width}px`,
        maxWidth: `${props.column.width}px`
      }
    })
    const sorter = computed(() => {
      return state.sorters[props.column.key] || {}
    })
    const filter = computed(() => {
      return state.filters[props.column.key] || {}
    })
    const hasFilterActive = computed(() => {
      const options = filter.value.options ?? []

      for (let i = 0, len = options.length; i < len; i++) {
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
      window.setTimeout(() => {
        if (wrapper.value) {
          mutations.setColumnWidth(props.column.key, wrapper.value.getBoundingClientRect().width)
        }
      }, 0)
    })

    function isSelection(column: unknown): column is SelectionColumn {
      return (column as TypeColumn).type === 'selection'
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

    function handleFilterItemSelect(value: string | number, active: boolean) {
      mutations.toggleFilterItemActive({
        key: props.column.key,
        value,
        active,
        disableOthers: true
      })
      mutations.handleFilter(props.column.key, value)
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

    function handleFilterMutiple() {
      const options = filter.value.options ?? []
      const activeValues = []

      for (let i = 0, len = options.length; i < len; i++) {
        const option = options[i]

        if (option.active) {
          activeValues.push(option.value)
        }
      }

      mutations.handleFilter(props.column.key, activeValues)
      filterVisible.value = false
      tableAction.emitRowFilter()
    }

    function handleResetFilter() {
      filterVisible.value = false
      mutations.handleFilter(props.column.key, null)
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
      prefix,
      locale: useLocaleConfig('table'),
      filterVisible,
      checkedAll: toRef(state, 'checkedAll'),
      partial: toRef(state, 'partial'),

      className,
      style,
      sorter,
      filter,
      hasFilterActive,
      checkboxDisabled,

      wrapper,

      isFunction,
      isSelection,
      handleSortAsc,
      handleSortDesc,
      handleFilterItemSelect,
      handleFilterCheck,
      handleFilterMutiple,
      handleResetFilter,
      handleCheckAllRow
    }
  }
})
</script>
