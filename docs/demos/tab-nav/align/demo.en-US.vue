<template>
  <p>
    Align:
    <RadioGroup v-model:value="align" button :options="aligns"></RadioGroup>
  </p>
  <TabNav :align="align">
    <TabNavItem label="Tab 1">
      Tab 1
    </TabNavItem>
    <TabNavItem label="Tab 2">
      Tab 2
    </TabNavItem>
    <TabNavItem label="Tab 3">
      Tab 3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TabNavAlign } from 'vexip-ui'

const aligns = ['left', 'center', 'right'] as TabNavAlign[]
const align = ref(aligns[0])
</script>
