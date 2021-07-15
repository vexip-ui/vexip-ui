<template>
  <Table use-y-bar :columns="columns" :data="pagedData">
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
    <TableColumn type="selection" id-key="selection"></TableColumn>
    <TableColumn type="order" id-key="order" name="Order"></TableColumn>
    <TableColumn
      name="First Name"
      id-key="firstName"
      :order="0"
      :filter="firstNameFilter"
    >
      <template #default="{ row }">
        <Icon name="user" style="margin-right: 8px;"></Icon>
        {{ row.firstName }}
      </template>
    </TableColumn>
    <TableColumn
      name="Job"
      id-key="job"
      :accessor="jobAccessor"
      :order="3"
    ></TableColumn>
    <TableColumn
      name="Age"
      id-key="age"
      :order="2"
      :sorter="ageSorter"
    ></TableColumn>
  </Table>
  <Pagination v-model:active="currentPage" :page-size="pageSize" :total="data.length"></Pagination>
  <br />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Column } from '@/components/column'
import { Icon } from '@/components/icon'
import { Row } from '@/components/row'
import { Pagination } from '@/components/pagination'
import Table from '../table.vue'
import TableColumn from '../table-column'
import { defineFilter, defineColumn } from '../helper'
import testData from './data.json'

import '@/common/icons/user'

export default defineComponent({
  name: 'Page',
  components: {
    Column,
    Icon,
    Row,
    Pagination,
    Table,
    TableColumn
  },
  setup() {
    const currentPage = ref(1)
    const pageSize = 3

    const data = ref(testData)

    const pagedData = computed(() => {
      return data.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
    })

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

    return {
      currentPage,
      pageSize,
      data,
      pagedData,
      columns,
      columns2,
      firstNameFilter,
      ageSorter,

      jobAccessor
    }
  }
})
</script>
