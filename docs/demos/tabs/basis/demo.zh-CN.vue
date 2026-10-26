<template>
  <Tabs v-model:active="active">
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

const active = ref('标签页1')
</script>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
