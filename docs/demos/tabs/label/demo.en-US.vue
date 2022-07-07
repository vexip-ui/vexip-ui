<template>
  <Tabs v-model:active="active">
    <TabPane label="1">
      <template #label>
        自定义一
      </template>
      <p>Some content for Tab 1.</p>
    </TabPane>
    <TabPane label="2">
      <template #label>
        自定义二
      </template>
      <p>Some content for Tab 2.</p>
    </TabPane>
    <TabPane label="3">
      <template #label>
        自定义三
      </template>
      <p>Some content for Tab 3.</p>
    </TabPane>
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
