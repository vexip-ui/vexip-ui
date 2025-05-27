<template>
  <Button type="primary" @click="toggleData">
    切换数据
  </Button>
  <br />
  <br />
  <Table
    use-y-bar
    :data="data"
    :width="1000"
    :row-height="40"
    :height="140"
  >
    <TableColumn
      name="First Name"
      id-key="firstName"
      :width="300"
      fixed
    ></TableColumn>
    <TableColumn name="Last Name" id-key="lastName" :width="300"></TableColumn>
    <TableColumn name="Job" id-key="job" :width="300"></TableColumn>
    <TableColumn name="Age" id-key="age" :width="300"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sourceData = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index + 1,
    firstName: `First ${index}`,
    lastName: `Last ${index}`,
    company: `Company ${index}`,
    job: `Job ${index}`,
    age: 20 + index,
    email: `email${index}@vexip.ui`,
    address: `Address ${index}`,
  }
})

const data = ref(sourceData.slice(-2))

function toggleData() {
  data.value = data.value.length !== 3 ? sourceData.slice(0, -2) : sourceData.slice(-2)
}
</script>
