<template>
  <Menu style="max-width: 240px">
    <MenuItem label="1" :icon="EnvelopesBulk">
      菜单一
      <template #group>
        <MenuItem label="1-1">
          子菜单一
        </MenuItem>
        <MenuItem label="1-2">
          子菜单二
        </MenuItem>
        <MenuItem label="1-3">
          子菜单三
        </MenuItem>
      </template>
    </MenuItem>
    <MenuItem label="2" :icon="City" disabled>
      菜单二
    </MenuItem>
    <MenuItem label="3" :icon="ChartPie">
      菜单三
    </MenuItem>
    <MenuItem label="4" :icon="User">
      菜单四
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { ChartPie, City, EnvelopesBulk, User } from '@vexip-ui/icons'
</script>
