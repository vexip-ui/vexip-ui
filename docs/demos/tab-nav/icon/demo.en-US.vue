<template>
  <TabNav v-model:active="active">
    <TabNavItem label="标签页1">
      标签页1
    </TabNavItem>
    <TabNavItem label="标签页2" :icon="ChartArea">
      标签页2
    </TabNavItem>
    <TabNavItem label="标签页3">
      标签页3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChartArea } from '@vexip-ui/icons'

const active = ref('标签页1')
</script>
