<template>
  <Menu style="width: 240px;">
    <MenuGroup label="分组一">
      <MenuItem label="1" :icon="EnvelopesBulk">
        菜单一
      </MenuItem>
      <MenuItem label="2" :icon="City" disabled>
        菜单二
      </MenuItem>
      <MenuItem label="3" :icon="ChartPie">
        菜单三
      </MenuItem>
    </MenuGroup>
    <MenuGroup label="分组二">
      <MenuItem label="4" :icon="User">
        菜单四
      </MenuItem>
      <MenuItem label="5" :icon="BuildingShield">
        菜单五
      </MenuItem>
    </MenuGroup>
    <MenuItem label="6" :icon="CheckDouble">
      菜单六
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User, BuildingShield, CheckDouble } from '@vexip-ui/icons'
</script>
