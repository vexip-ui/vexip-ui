<template>
  <Tabs v-model:active="active">
    <TabPanel label="1">
      <template #label>
        自定义 1
      </template>
      <p>标签页 1 的内容。</p>
    </TabPanel>
    <TabPanel label="2">
      <template #label>
        自定义 2
      </template>
      <p>标签页 2 的内容。</p>
    </TabPanel>
    <TabPanel label="3">
      <template #label>
        自定义 3
      </template>
      <p>标签页 3 的内容。</p>
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
