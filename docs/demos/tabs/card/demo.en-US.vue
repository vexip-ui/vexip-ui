<template>
  <Tabs v-model:active="active" card>
    <TabPane label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPane>
    <TabPane label="Tab 2">
      <p>Some content for Tab 2.</p>
    </TabPane>
    <TabPane label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPane>
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
