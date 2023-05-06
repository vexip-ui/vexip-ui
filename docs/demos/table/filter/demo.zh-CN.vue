<template>
  <Table
    ref="table"
    :columns="columns"
    :data="data"
    :width="1000"
    :row-height="40"
    @row-filter="handleRowFilter"
  >
    <TableColumn
      name="Age"
      id-key="age"
      :order="1"
      :filter="ageFilter"
    >
      <template #filter="{ filter, handleFilter }">
        <Tooltip transfer placement="bottom" trigger="click">
          <template #trigger>
            <div class="column-filter">
              <Icon :icon="Filter"></Icon>
            </div>
          </template>
          <template #default="{ toggleVisible }">
            <Space vertical>
              最小值：
              <NumberInput v-model:value="filter.meta.values[0]" sync></NumberInput>
              最大值：
              <NumberInput v-model:value="filter.meta.values[1]" sync></NumberInput>
              <div style="margin: 3px 0">
                <Button
                  text
                  size="small"
                  :disabled="
                    Number.isNaN(filter.meta.values[0]) || Number.isNaN(filter.meta.values[1])
                  "
                  @click="handleFilter(filter.meta.values), toggleVisible(false)"
                >
                  筛选
                </Button>
                <Button
                  text
                  size="small"
                  @click="resetAgeFilter(), handleFilter(null), toggleVisible(false)"
                >
                  重置
                </Button>
              </div>
            </Space>
          </template>
        </Tooltip>
      </template>
    </TableColumn>
  </Table>
  <Button style="margin-top: 10px" @click="clearFilter">
    清除过滤
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineFilter } from 'vexip-ui'
import { Filter } from '@vexip-ui/icons'

import type { Table, TableFilterProfile } from 'vexip-ui'

interface RowData {
  id: string,
  job: string,
  email: string,
  firstName: string,
  lastName: string,
  age: string
}

const table = ref<InstanceType<typeof Table>>()

const columns = ref([
  {
    name: 'First Name',
    key: 'firstName',
    filter: defineFilter({
      options: [
        { label: 'Starts with A', value: 'A' },
        { label: 'Starts with E', value: 'E' }
      ],
      method: (value, row: RowData) => {
        return row.firstName.startsWith(value)
      }
    })
  },
  {
    name: 'Last Name',
    key: 'lastName',
    filter: defineFilter({
      options: [
        { label: 'Starts with D', value: 'D' },
        { label: 'Starts with F', value: 'F' },
        { label: 'Starts with R', value: 'R' },
        { label: 'Starts with T', value: 'T' }
      ],
      multiple: true,
      method: (values, row: RowData) => {
        for (const value of values) {
          if (row.lastName.startsWith(value)) {
            return true
          }
        }

        return false
      }
    })
  },
  {
    name: 'Job',
    key: 'job'
  }
])

const ageFilter = defineFilter({
  custom: true,
  meta: {
    values: [NaN, NaN]
  },
  method: (value: number[], row: RowData) => {
    const age = parseFloat(row.age)
    return age >= value[0] && age <= value[1]
  }
})

const data = ref([
  {
    id: '1',
    job: 'Cashier',
    email: 'Angelique_Walsh2268@twace.org',
    firstName: 'Angelique',
    lastName: 'Walsh',
    age: '58'
  },
  {
    id: '2',
    job: 'Stockbroker',
    email: 'Aeris_Drake5867@gmail.com',
    firstName: 'Aeris',
    lastName: 'Drake',
    age: '40'
  },
  {
    id: '3',
    job: 'Machine Operator',
    email: 'Elisabeth_Rogers7566@sheye.org',
    firstName: 'Elisabeth',
    lastName: 'Rogers',
    age: '56'
  },
  {
    id: '4',
    job: 'Audiologist',
    email: 'Sharon_Tanner5855@nickia.com',
    firstName: 'Sharon',
    lastName: 'Tanner',
    age: '58'
  },
  {
    id: '5',
    job: 'Cashier',
    email: 'Evie_Farmer6650@typill.biz',
    firstName: 'Evie',
    lastName: 'Farmer',
    age: '26'
  }
])

function handleRowFilter(profiles: TableFilterProfile[]) {
  console.info(profiles)
}

function clearFilter() {
  table.value?.clearFilter()
}

function resetAgeFilter() {
  ageFilter.meta.values[0] = NaN
  ageFilter.meta.values[1] = NaN
}
</script>

<style scoped>
.column-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  margin-left: 3px;
  color: var(--vxp-table-filter-color);
  cursor: pointer;
  transition: var(--vxp-transition-color);
}

.column-filter:hover {
  color: var(--vxp-table-filter-color-hover);
}
</style>
