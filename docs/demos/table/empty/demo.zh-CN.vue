<template>
  <Table :width="1000">
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
  </Table>
  <br />
  <Table :width="1000">
    <TableColumn name="First Name" id-key="firstName"></TableColumn>
    <TableColumn name="Last Name" id-key="lastName"></TableColumn>
    <TableColumn name="Job" id-key="job"></TableColumn>
    <TableColumn name="Age" id-key="age"></TableColumn>
    <template #empty>
      <Icon :scale="3">
        <FaceGrinTearsR></FaceGrinTearsR>
      </Icon>
      <span style="font-size: 18px;">
        空空如也
      </span>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { FaceGrinTearsR } from '@vexip-ui/icons'
</script>
