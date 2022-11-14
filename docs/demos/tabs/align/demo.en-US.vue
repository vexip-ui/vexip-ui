<template>
  <p>
    Align:
    <RadioGroup v-model:value="align" button :options="aligns"></RadioGroup>
  </p>
  <Tabs :align="align">
    <TabPanel label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPanel>
    <TabPanel label="Tab 2">
      <p>Some content for Tab 2.</p>
    </TabPanel>
    <TabPanel label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPanel>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TabNavAlign } from 'vexip-ui'

const aligns = ['left', 'center', 'right'] as TabNavAlign[]
const align = ref(aligns[0])
</script>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
