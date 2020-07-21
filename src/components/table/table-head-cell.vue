<template>
  <div :class="className" :style="style">
    <checkbox
      v-if="column.type === 'selection'"
      control
      :class="`${prefix}__selection`"
      :checked="checkedAll"
      :partial="partial"
      :size="column.size || 'default'"
      @click.native.prevent="handleCheckAllRow"
    ></checkbox>
    <Render
      v-else-if="isFunction(column.headRenderer)"
      :renderer="column.headRenderer"
      :data="{column, index}"
    ></Render>
    <template v-else>
      {{ column.name }}
      <div v-if="sorter.able" :class="`${prefix}__sorter`">
        <span
          :class="{
            [`${prefix}__sorter--asc`]: true,
            [`${prefix}__sorter--active`]: sorter.type === 'asc'
          }"
          @click="handleSortAsc()"
        >
          <Icon name="caret-up"></Icon>
        </span>
        <span
          :class="{
            [`${prefix}__sorter--desc`]: true,
            [`${prefix}__sorter--active`]: sorter.type === 'desc'
          }"
          @click="handleSortDesc()"
        >
          <Icon name="caret-down"></Icon>
        </span>
      </div>
      <Tooltip
        v-if="filter.able"
        v-model="filterVisible"
        placement="bottom"
        trigger="click"
        :class="{
          [`${prefix}__filter`]: true,
          [`${prefix}__filter--visible`]: filterVisible,
          [`${prefix}__filter--active`]: filter.active
        }"
        :tip-class="{
          [`${prefix}__filter-wrapper`]: true,
          [`${prefix}__filter-wrapper--multiple`]: filter.multiple
        }"
      >
        <div :class="`${prefix}__filter-trigger`">
          <Icon name="filter" :scale="0.8"></Icon>
        </div>
        <template v-if="filter.multiple" slot="tip">
          <CheckboxGroup vertical :class="`${prefix}__filter-group`">
            <Checkbox
              v-for="item in filter.options"
              :key="item.value"
              :checked="item.active"
              :label="item.label"
              :value="item.value"
              @on-change="handleFilterCheck(item.value, $event)"
            ></Checkbox>
          </CheckboxGroup>
          <div :class="`${prefix}__filter-actions`">
            <Button
              type="text"
              size="small"
              :disabled="!hasFilterActive"
              @on-click="handleFilterMutiple()"
            >
              筛选
            </Button>
            <Button
              type="text"
              size="small"
              @on-click="handleResetFilter()"
            >
              重置
            </Button>
          </div>
        </template>
        <template v-else slot="tip">
          <div
            :class="{
              [`${prefix}__filter-item`]: true,
              [`${prefix}__filter-item--active`]: !filter.active
            }"
            @click="handleResetFilter()"
          >
            全部
          </div>
          <div
            v-for="item in filter.options"
            :key="item.value"
            :class="{
              [`${prefix}__filter-item`]: true,
              [`${prefix}__filter-item--active`]: item.active
            }"
            @click="handleFilterItemSelect(item)"
          >
            {{ item.label }}
          </div>
        </template>
      </Tooltip>
    </template>
  </div>
</template>

<script>
import Button from '../button'
import Checkbox from '../checkbox'
import CheckboxGroup from '../checkbox/checkbox-group'
import Icon from '../icon'
import Render from '../basis/render'
import Tooltip from '../tooltip'
import { mapState, mapMutations, mapActions } from './store'

import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/filter'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'TableHeadCell',
  components: {
    Button,
    Checkbox,
    CheckboxGroup,
    Icon,
    Render,
    Tooltip
  },
  inject: ['table'],
  props: {
    column: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      prefix: `${prefix}-table`,
      filterVisible: false
    }
  },
  computed: {
    ...mapState(['checkedAll', 'partial', 'widths', 'sorters', 'filters']),
    className() {
      const { prefix, column } = this
      const customClass = column.className || null

      return [
        `${prefix}__head-cell`,
        {
          [`${prefix}__head-cell--center`]: column.type === 'selection'
        },
        customClass
      ]
    },
    style() {
      const { widths, column } = this
      const width = widths[column.key]

      return {
        flex: `${width} 0 auto`,
        width: `${width}px`,
        maxWidth: `${column.width}px`
      }
    },
    sorter() {
      const { column, sorters } = this

      return sorters[column.key] || {}
    },
    filter() {
      const { column, filters } = this

      return filters[column.key] || {}
    },
    hasFilterActive() {
      const options = this.filter.options || []

      for (let i = 0, len = options.length; i < len; i++) {
        if (options[i].active) {
          return true
        }
      }

      return false
    }
  },
  mounted() {
    this.$nextTick(() => {
      const width = this.$el.getBoundingClientRect().width

      this.setColumnWidth(this.column.key, width)
    })
  },
  methods: {
    ...mapMutations([
      'handleSort',
      'setColumnWidth',
      'handleFilter',
      'toggleFilterItemActive'
    ]),
    ...mapActions(['handleCheckAll']),
    isFunction(value) {
      return typeof value === 'function'
    },
    handleSortAsc() {
      const key = this.column.key
      const type = this.sorter.type === 'asc' ? null : 'asc'

      this.handleSort(key, type)
    },
    handleSortDesc() {
      const key = this.column.key
      const type = this.sorter.type === 'desc' ? null : 'desc'

      this.handleSort(key, type)
    },
    handleFilterItemSelect({ value, active }) {
      this.toggleFilterItemActive({
        key: this.column.key,
        value,
        active: !active,
        disableOthers: true
      })
      this.handleFilter(this.column.key, value)
      this.filterVisible = false
    },
    handleFilterCheck(value, checked) {
      this.toggleFilterItemActive({
        key: this.column.key,
        value,
        active: checked
      })
    },
    handleFilterMutiple() {
      const options = this.filter.options || []
      const activeValues = []

      for (let i = 0, len = options.length; i < len; i++) {
        const option = options[i]

        if (option.active) {
          activeValues.push(option.value)
        }
      }

      this.handleFilter(this.column.key, activeValues)
      this.filterVisible = false
    },
    handleResetFilter() {
      this.filterVisible = false
      this.handleFilter(this.column.key, null)
      this.toggleFilterItemActive({
        key: this.column.key,
        value: null,
        disableOthers: true
      })
    },
    handleCheckAllRow() {
      this.handleCheckAll()
      this.table.emitAllRowCheck(this.checkedAll)
    }
  }
}
</script>
