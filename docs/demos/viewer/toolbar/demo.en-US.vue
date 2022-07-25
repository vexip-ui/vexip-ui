<template>
  <Space style="max-width: 900px;">
    <div v-for="placement in placements.slice(0, 6)" :key="placement">
      <div style="max-width: 400px;">
        {{ placement }}
      </div>
      <Viewer :toolbar-placement="placement" width="400" height="100">
        <div class="content"></div>
      </Viewer>
    </div>
  </Space>
  <Space style="max-width: 900px; margin-top: 10px;">
    <div v-for="placement in placements.slice(6)" :key="placement">
      <div style="max-width: 100px;">
        {{ placement }}
      </div>
      <Viewer :toolbar-placement="placement" width="100" height="400">
        <div class="content"></div>
      </Viewer>
    </div>
  </Space>
</template>

<script setup lang="ts">
import type { ToolbarPlacement } from 'vexip-ui/es/viewer'

const placements: ToolbarPlacement[] = [
  'top',
  'bottom',
  'top-start',
  'bottom-start',
  'top-end',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
]
</script>

<style scoped>
.content {
  width: 400px;
  height: 400px;
  background-color: var(--vxp-color-primary-base);
}
</style>
