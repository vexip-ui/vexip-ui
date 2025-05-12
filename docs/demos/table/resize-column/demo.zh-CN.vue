<template>
  <p>
    即时变化：
    <Switch v-model:value="responsive"></Switch>
  </p>
  <Table
    use-x-bar
    :data="data"
    :width="1000"
    :col-resizable="responsive ? 'responsive' : 'lazy'"
  >
    <TableColumn type="selection"></TableColumn>
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Desc" id-key="desc"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const responsive = ref(false)

const data = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index + 1,
    firstName: `First ${index}`,
    lastName: `Last ${index}`,
    company: `Company ${index}`,
    job: `Job ${index}`,
    age: 20 + index,
    email: `email${index}@vexip.ui`,
    address: `Address ${index}`,
    desc:
      'xxx-'.repeat(1 + Math.round(3 * Math.random())) +
      '' +
      'x'.repeat(5 + Math.round(10 * Math.random())),
  }
})
</script>
