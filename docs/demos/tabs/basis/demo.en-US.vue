<template>
  <Tabs v-model:active="active">
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

const active = ref('Tab 1')
</script>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
