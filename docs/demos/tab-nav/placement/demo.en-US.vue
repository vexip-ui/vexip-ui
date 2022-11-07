<template>
  <p>
    Placement:
    <RadioGroup v-model:value="placement" button :options="placements"></RadioGroup>
  </p>
  <TabNav :placement="placement">
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

import type { TabNavPlacement } from 'vexip-ui'

const placements = ['top', 'right', 'bottom', 'left'] as TabNavPlacement[]
const placement = ref(placements[0])
</script>
