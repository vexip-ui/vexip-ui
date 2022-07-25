<template>
  <CollapsePanel title="Independent Panel 1" arrow-type="left">
    <p>Some content to fill</p>
    <p>Some content to fill</p>
  </CollapsePanel>
  <br />
  <CollapsePanel card>
    <template #title>
      <Icon><ChartLine></ChartLine></Icon>
      Independent Panel 2
    </template>
    <p>Some content to fill</p>
    <p>Some content to fill</p>
  </CollapsePanel>
</template>

<script setup lang="ts">
import { ChartLine } from '@vexip-ui/icons'
</script>

<style scoped>
.vxp-collapse__panel {
  max-width: 500px;
}
</style>
