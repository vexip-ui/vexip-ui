<template>
  <Menu style="max-width: 240px;">
    <MenuItem label="1" :icon="EnvelopesBulk">
      Menu 1
      <template #group>
        <MenuItem label="1-1">
          Child Menu 1
        </MenuItem>
        <MenuItem label="1-2">
          Child Menu 2
        </MenuItem>
        <MenuItem label="1-3">
          Child Menu 3
        </MenuItem>
      </template>
    </MenuItem>
    <MenuItem label="2" :icon="City" disabled>
      Menu 2
    </MenuItem>
    <MenuItem label="3" :icon="ChartPie">
      Menu 3
    </MenuItem>
    <MenuItem label="4" :icon="User">
      Menu 4
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'
</script>
