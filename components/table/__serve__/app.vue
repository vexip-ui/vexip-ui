<template>
  <Table use-y-bar :columns="columns" :data="data">
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
  <br />
  <Table :columns="columns2" :data="data.slice(0, 5)">
    <TableColumn name="First Name" id-key="firstName" :order="0">
      <template #default="{ row }">
        <Icon name="user" style="margin-right: 8px;"></Icon>
        {{ row.firstName }}
      </template>
    </TableColumn>
    <TableColumn name="Job" id-key="job" :order="3"></TableColumn>
    <TableColumn name="Age" id-key="age" :order="2"></TableColumn>
  </Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Column } from '@/components/column'
import { Icon } from '@/components/icon'
import { Row } from '@/components/row'
import Table from '../table.vue'
import TableColumn from '../table-column'

import '@/common/icons/user'

export default defineComponent({
  name: 'App',
  components: {
    Column,
    Icon,
    Row,
    Table,
    TableColumn
  },
  data() {
    return {
      test: false,
      columns: [
        {
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
            method(values: string[], row: { lastName: string }) {
              for (const value of values) {
                if (row.lastName.startsWith(value)) {
                  return true
                }
              }

              return false
            }
          }
        }
      ],
      columns2: [
        {
          name: 'Last Name',
          key: 'lastName',
          order: 1
        }
      ],
      firstNameFilter: {
        able: true,
        options: [
          { label: 'Starts with A', value: 'A' },
          { label: 'Starts with E', value: 'E' }
        ],
        method(value: string, row: { firstName: string }) {
          return row.firstName.startsWith(value)
        }
      },
      ageSorter: {
        able: true,
        type: 'asc'
      },
      data: [
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
        },
        {
          id: '6',
          job: 'Dentist',
          email: 'Phillip_Rixon8188@gmail.com',
          firstName: 'Phillip',
          lastName: 'Rixon',
          age: '37'
        },
        {
          id: '7',
          job: 'Web Developer',
          email: 'Liam_Pickard9810@ovock.tech',
          firstName: 'Liam',
          lastName: 'Pickard',
          age: '32'
        },
        {
          id: '8',
          job: 'Staffing Consultant',
          email: 'Ruth_Mcleod599@naiker.biz',
          firstName: 'Ruth',
          lastName: 'Mcleod',
          age: '21'
        },
        {
          id: '9',
          job: 'Stockbroker',
          email: 'Marvin_Lakey4748@fuliss.net',
          firstName: 'Marvin',
          lastName: 'Lakey',
          age: '41'
        },
        {
          id: '10',
          job: 'Lecturer',
          email: 'Deborah_Santos5515@ubusive.com',
          firstName: 'Deborah',
          lastName: 'Santos',
          age: '29'
        }
      ]
    }
  },
  methods: {
    jobAccessor(row: { job: string }) {
      return row.job
    }
  }
})
</script>

<style lang="scss"></style>
