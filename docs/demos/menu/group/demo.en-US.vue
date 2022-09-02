<template>
  <Menu style="max-width: 240px;">
    <MenuGroup label="Group 1">
      <MenuItem label="1" :icon="EnvelopesBulk">
        Menu 1
      </MenuItem>
      <MenuItem label="2" :icon="City" disabled>
        Menu 2
      </MenuItem>
      <MenuItem label="3" :icon="ChartPie">
        Menu 3
      </MenuItem>
    </MenuGroup>
    <MenuGroup label="Group 2">
      <MenuItem label="4" :icon="User">
        Menu 4
      </MenuItem>
      <MenuItem label="5" :icon="BuildingShield">
        Menu 5
      </MenuItem>
    </MenuGroup>
    <MenuItem label="6" :icon="CheckDouble">
      Menu 6
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User, BuildingShield, CheckDouble } from '@vexip-ui/icons'
</script>
