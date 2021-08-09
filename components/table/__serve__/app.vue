<template>
  <Table
    :columns="columns2"
    :data="data"
    :height="310"
    :width="300"
    empty-text="无数据"
  >
    <TableColumn type="expand" id-key="expand">
      <template #default="{ row }">
        <Row style="padding: 20px 40px; background-color: #f8f9fa;">
          <Column :span="12">
            Full Name: {{ `${row.firstName} ${row.lastName}` }}
          </Column>
          <Column :span="12">
            Age: {{ row.age }}
          </Column>
          <Column :span="12">
            Job: {{ row.job }}
          </Column>
          <Column :span="12">
            Email: {{ row.email }}
          </Column>
        </Row>
      </template>
    </TableColumn>
    <TableColumn
      name="First Name"
      id-key="firstName"
      :order="0"
      fixed
    >
      <template #default="{ row }">
        <Icon name="user" style="margin-right: 8px;"></Icon>
        {{ row.firstName }}
      </template>
    </TableColumn>
    <TableColumn name="Job" id-key="job" :order="3"></TableColumn>
    <TableColumn name="Age" id-key="age" :order="2"></TableColumn>
    <!-- <template #empty="{ isFixed }">
      <div class="vxp-table__empty" :data-fixed="isFixed">
        <template v-if="!isFixed">
          无数据
        </template>
      </div>
    </template> -->
  </Table>
  <br />
  <Button type="primary" @click="toggleData">
    切换数据
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button } from '@/components/button'
import { Column } from '@/components/column'
import { Icon } from '@/components/icon'
import { Row } from '@/components/row'
import Table from '../table.vue'
import TableColumn from '../table-column'
import { deepClone } from '@/common/utils/deep-clone'
import { defineFilter, defineColumn } from '../helper'
import testData from './data.json'

import '@/common/icons/user'

const clonedData = deepClone(testData.slice(5).reverse())

clonedData.forEach((data, index) => {
  data.id = `${testData.length + index}`
})

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Column,
    Icon,
    Row,
    Table,
    TableColumn
  },
  setup() {
    const flag = ref(false)
    const data = ref(testData)

    const columns = ref([
      defineColumn({
        name: 'Last Name',
        key: 'lastName',
        order: 1,
        filter: {
          able: true,
          options: [
            { label: 'Starts with D', value: 'D' },
            { label: 'Starts with F', value: 'F' },
            { label: 'Starts with R', value: 'R' },
            { label: 'Starts with T', value: 'T' }
          ],
          multiple: true,
          method(values, row: { lastName: string }) {
            for (const value of values) {
              if (row.lastName.startsWith(value)) {
                return true
              }
            }

            return false
          }
        }
      })
    ])

    const firstNameFilter = ref(
      defineFilter({
        able: true,
        options: [
          { label: 'Starts with A', value: 'A' },
          { label: 'Starts with E', value: 'E' }
        ],
        multiple: false,
        method(value, row: { firstName: string }) {
          return row.firstName.startsWith(value)
        }
      })
    )

    const ageSorter = ref({
      able: true,
      type: 'asc' as const
    })

    const columns2 = ref([
      defineColumn({
        name: 'Last Name',
        key: 'lastName',
        order: 1
      })
    ])

    function jobAccessor(row: { job: string }) {
      return row.job
    }

    function toggleData() {
      data.value = flag.value ? testData : []
      flag.value = !flag.value
    }

    return {
      data,
      columns,
      columns2,
      firstNameFilter,
      ageSorter,

      jobAccessor,
      toggleData
    }
  }
})
</script>
