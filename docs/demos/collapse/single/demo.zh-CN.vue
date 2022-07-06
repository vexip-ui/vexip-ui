<template>
  <CollapsePane title="独立面板一" arrow-type="left">
    <p>一些内容一些内容一些内容</p>
    <p>一些内容一些内容一些内容</p>
  </CollapsePane>
  <br />
  <CollapsePane card>
    <template #title>
      <Icon><ChartLine></ChartLine></Icon>
      独立面板二
    </template>
    <p>一些内容一些内容一些内容</p>
    <p>一些内容一些内容一些内容</p>
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
