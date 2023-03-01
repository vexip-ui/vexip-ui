<template>
  <Tabs v-model:active="active">
    <TabPanel label="1">
      <template #label>
        Custom 1
      </template>
      <p>Some content for Tab 1.</p>
    </TabPanel>
    <TabPanel label="2">
      <template #label>
        Custom 2
      </template>
      <p>Some content for Tab 2.</p>
    </TabPanel>
    <TabPanel label="3">
      <template #label>
        Custom 3
      </template>
      <p>Some content for Tab 3.</p>
    </TabPanel>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('1')
</script>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
