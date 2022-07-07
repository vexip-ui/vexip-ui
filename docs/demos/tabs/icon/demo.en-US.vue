<template>
  <Tabs>
    <TabPane label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPane>
    <TabPane label="Tab 2" :icon="ChartArea">
      <p>Some content for Tab 2.</p>
    </TabPane>
    <TabPane label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPane>
  </Tabs>
  <br />
  <br />
  <Tabs card>
    <TabPane label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPane>
    <TabPane label="Tab 2" :icon="ChartArea">
      <p>Some content for Tab 2.</p>
    </TabPane>
    <TabPane label="Tab 3">
      <p>Some content for Tab 3.</p>
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
