<template>
  <p>
    Placement:
    <RadioGroup v-model:value="placement" button :options="placements"></RadioGroup>
  </p>
  <TabNav :placement="placement">
    <TabNavItem label="标签页1">
      Tab 1
    </TabNavItem>
    <TabNavItem label="标签页2">
      Tab 2
    </TabNavItem>
    <TabNavItem label="标签页3">
      Tab 3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TabNavPlacement } from 'vexip-ui'

const placements = ['top', 'right'] as TabNavPlacement[]
const placement = ref(placements[0])
</script>

<style scoped>
.vxp-tab-nav {
  display: inline-flex;
  padding: 0 3px;
  background-color: #fff;
  border: var(--vxp-border-base);
  border-radius: var(--vxp-radius-base);
}

.vxp-tab-nav--right {
  padding: 3px 0;
}

:deep(.vxp-tab-nav__item) {
  position: relative;
  height: 32px;
}

:deep(.vxp-tab-nav__content) {
  z-index: 1;
  height: 100%;
  padding: 0 10px;
  line-height: 1;
  border: 0;
}

:deep(.vxp-tab-nav__content--active) {
  color: #fff;
}

:deep(.vxp-tab-nav__track) {
  inset: 3px auto;
}

.vxp-tab-nav--right:deep(.vxp-tab-nav__track) {
  inset: auto 3px;
}

:deep(.vxp-tab-nav__marker) {
  width: 100%;
  height: 100%;
  border-radius: var(--vxp-radius-small);
}
</style>
