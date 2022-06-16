<template>
  <Tabs>
    <TabPane label="标签页1">
      <p>标签页一的内容。</p>
    </TabPane>
    <TabPane label="标签页2" :icon="ChartArea">
      <p>标签页二的内容。</p>
    </TabPane>
    <TabPane label="标签页3">
      <p>标签页三的内容。</p>
    </TabPane>
  </Tabs>
  <br />
  <br />
  <Tabs card>
    <TabPane label="标签页1">
      <p>标签页一的内容。</p>
    </TabPane>
    <TabPane label="标签页2" :icon="ChartArea">
      <p>标签页二的内容。</p>
    </TabPane>
    <TabPane label="标签页3">
      <p>标签页三的内容。</p>
    </TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ChartArea } from '@vexip-ui/icons'
</script>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
