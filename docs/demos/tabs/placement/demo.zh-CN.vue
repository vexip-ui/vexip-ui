<template>
  <p>
    Placement:
    <RadioGroup v-model:value="placement" button :options="placements"></RadioGroup>
  </p>
  <Tabs :placement="placement">
    <TabPanel label="标签页1">
      <span>标签页 1 的内容。</span>
    </TabPanel>
    <TabPanel label="标签页2">
      <span>标签页 2 的内容。</span>
    </TabPanel>
    <TabPanel label="标签页3">
      <span>标签页 3 的内容。</span>
    </TabPanel>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const placements = ['top', 'right', 'bottom', 'left'] as const
const placement = ref(placements[0])
</script>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
