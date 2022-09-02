<template>
  <Menu style="max-width: 240px;" @select="handleSelect">
    <MenuItem label="1" :icon="EnvelopesBulk">
      菜单一
      <template #group>
        <MenuItem label="1-1" :meta="{ path: '/m_1_1' }">
          子菜单一
        </MenuItem>
        <MenuItem label="1-2" :meta="{ path: '/m_1_2' }">
          子菜单二
        </MenuItem>
        <MenuItem label="1-3" :meta="{ path: '/m_1_3' }">
          子菜单三
        </MenuItem>
      </template>
    </MenuItem>
    <MenuItem
      label="2"
      :icon="City"
      disabled
      :meta="{ path: '/m_2' }"
    >
      菜单二
    </MenuItem>
    <MenuItem label="3" :icon="ChartPie" :meta="{ path: '/m_3' }">
      菜单三
    </MenuItem>
    <MenuItem label="4" :icon="User" :meta="{ path: '/m_4' }">
      菜单四
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

function handleSelect(label: string, meta: { path: string }) {
  console.info(label, meta)
}
</script>
