<template>
  <Upload
    multiple
    allow-drag
    disabled-click
    manual
    directory
    :count-limit="10"
  >
    <template #default="{ isDragOver }">
      <Table
        :columns="columns"
        :data="data"
        :height="200"
        :tooltip-width="300"
        :width="1000"
        use-y-bar
        @on-row-sort="handleRowSort"
      >
        <TableColumn
          type="selection"
          id-key="selection"
          fixed
          :disable-row="isDisabled"
        ></TableColumn>
        <TableColumn type="order" id-key="order" fixed></TableColumn>
        <TableColumn type="expand" id-key="expand" fixed>
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
          sorter
          :width="300"
        >
          <template #default="{ row }">
            <Icon name="user" style="margin-right: 8px;"></Icon>
            {{ row.firstName }}
          </template>
        </TableColumn>
        <TableColumn
          name="Job"
          id-key="job"
          :order="3"
          fixed="right"
        ></TableColumn>
        <TableColumn
          name="Age"
          id-key="age"
          :order="2"
          no-ellipsis
          :sorter="ageSorter"
          :width="300"
        ></TableColumn>
        <TableColumn name="Long Text" id-key="longText" :width="300">
          很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本
        </TableColumn>
        <!-- <template #empty="{ isFixed }">
          <div class="vxp-table__empty" :data-fixed="isFixed">
            <template v-if="!isFixed">
              无数据
            </template>
          </div>
        </template> -->
      </Table>
      {{ isDragOver }}
    </template>
  </Upload>
  <br />
  <Button type="primary" @click="toggleData">
    切换数据
  </Button>
  <Button type="primary" @click="addData">
    插入数据
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button } from '@/components/button'
import { Column } from '@/components/column'
import { Icon } from '@/components/icon'
import { Row } from '@/components/row'
import { Upload } from '@/components/upload'
import Table from '../table.vue'
import TableColumn from '../table-column'
import { deepClone } from '@vexip-ui/utils'
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
    Upload,
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

    function addData() {
      data.value.unshift({ ...testData[0], id: undefined! })
    }

    function isDisabled(row: any) {
      return row.id !== '1'
    }

    function handleRowSort(profiles: any, data: any[]) {
      console.log(profiles, data)
    }

    return {
      data,
      columns,
      columns2,
      firstNameFilter,
      ageSorter,

      jobAccessor,
      toggleData,
      addData,
      isDisabled,
      handleRowSort
    }
  }
})
</script>
