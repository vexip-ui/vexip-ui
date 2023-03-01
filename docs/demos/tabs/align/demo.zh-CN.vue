<template>
  <p>
    Align:
    <RadioGroup v-model:value="align" button :options="aligns"></RadioGroup>
  </p>
  <Tabs :align="align">
    <TabPanel label="标签页1">
      <p>标签页 1 的内容。</p>
    </TabPanel>
    <TabPanel label="标签页2">
      <p>标签页 2 的内容。</p>
    </TabPanel>
    <TabPanel label="标签页3">
      <p>标签页 3 的内容。</p>
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
