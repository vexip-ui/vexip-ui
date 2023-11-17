<template>
  <Button type="primary" @click="active = !active">
    打开模态框
  </Button>
  <Modal v-model:active="active" modal-style="min-width: 800px;" @show="refresh">
    <Table ref="table" :data="data" width="100%">
      <TableColumn name="First Name" id-key="firstName"></TableColumn>
      <TableColumn name="Last Name" id-key="lastName"></TableColumn>
      <TableColumn name="Job" id-key="job"></TableColumn>
      <TableColumn name="Age" id-key="age"></TableColumn>
    </Table>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TableExposed } from 'vexip-ui'

const table = ref<TableExposed>()

const active = ref(false)

const data = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index + 1,
    firstName: `First ${index}`,
    lastName: `Last ${index}`,
    company: `Company ${index}`,
    job: `Job ${index}`,
    age: 20 + index,
    email: `email${index}@vexip.ui`,
    address: `Address ${index}`
  }
})

function refresh() {
  table.value?.refresh()
}
</script>
