<template>
  <p>
    Placement:
    <RadioGroup v-model:value="placement" button :options="placements"></RadioGroup>
  </p>
  <Tabs :placement="placement">
    <TabPanel label="Tab 1">
      <span>Some content for Tab 1.</span>
    </TabPanel>
    <TabPanel label="Tab 2">
      <span>Some content for Tab 2.</span>
    </TabPanel>
    <TabPanel label="Tab 3">
      <span>Some content for Tab 3.</span>
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
