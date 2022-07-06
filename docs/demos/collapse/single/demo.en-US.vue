<template>
  <CollapsePane title="Independent Panel 1" arrow-type="left">
    <p>Some content to fill</p>
    <p>Some content to fill</p>
  </CollapsePane>
  <br />
  <CollapsePane card>
    <template #title>
      <Icon><ChartLine></ChartLine></Icon>
      Independent Panel 2
    </template>
    <p>Some content to fill</p>
    <p>Some content to fill</p>
  </CollapsePane>
</template>

<script setup lang="ts">
import { ChartLine } from '@vexip-ui/icons'
</script>

<style scoped>
.vxp-collapse__pane {
  max-width: 500px;
}
</style>
