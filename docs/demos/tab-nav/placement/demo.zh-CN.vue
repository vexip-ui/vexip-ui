<template>
  <p>
    Placement:
    <RadioGroup v-model:value="placement" button :options="placements"></RadioGroup>
  </p>
  <TabNav :placement="placement">
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

import type { TabNavPlacement } from 'vexip-ui'

const placements = ['top', 'right', 'bottom', 'left'] as TabNavPlacement[]
const placement = ref(placements[0])
</script>
