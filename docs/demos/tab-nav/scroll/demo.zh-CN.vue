<template>
  <p>
    Placement:
    <RadioGroup v-model:value="placement" button :options="placements"></RadioGroup>
  </p>
  <TabNav
    v-model:active="active"
    :placement="placement"
    :style="{ height: placement === 'left' ? '200px' : undefined }"
  >
    <TabNavItem v-for="tab in tabs" :key="tab.label" :label="tab.label">
      {{ `标签页${tab.label}` }}
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TabNavPlacement } from 'vexip-ui'

const placements = ['top', 'left'] as TabNavPlacement[]
const placement = ref(placements[0])

const tabs = Array.from({ length: 30 }).map((_, index) => ({
  label: index + 1,
}))
const active = ref(1)
</script>
