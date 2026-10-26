<template>
  <Input type="password" plain-password style="max-width: 300px"></Input>
  <br />
  <br />
  <Input
    type="password"
    plain-password
    clearable
    style="max-width: 300px"
  >
    <template #password="{ plain }">
      <Icon v-if="plain">
        <FaceSurpriseR></FaceSurpriseR>
      </Icon>
      <Icon v-else>
        <FaceMehR></FaceMehR>
      </Icon>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { FaceMehR, FaceSurpriseR } from '@vexip-ui/icons'
</script>

<style scoped>
.vxp-input {
  max-width: 300px;
}
</style>
