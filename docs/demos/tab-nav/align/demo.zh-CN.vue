<template>
  <p>
    Align:
    <RadioGroup v-model:value="align" button :options="aligns"></RadioGroup>
  </p>
  <TabNav :align="align">
    <TabNavItem label="标签页1">
      标签页1
    </TabNavItem>
    <TabNavItem label="标签页2">
      标签页2
    </TabNavItem>
    <TabNavItem label="标签页3">
      标签页3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TabNavAlign } from 'vexip-ui'

const aligns = ['left', 'center', 'right'] as TabNavAlign[]
const align = ref(aligns[0])
</script>
