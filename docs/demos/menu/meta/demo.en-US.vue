<template>
  <Menu style="width: 240px;" @select="handleSelect">
    <MenuItem label="1" :icon="EnvelopesBulk">
      Menu 1
      <template #group>
        <MenuItem label="1-1" :meta="{ path: '/m_1_1' }">
          Child Menu 1
        </MenuItem>
        <MenuItem label="1-2" :meta="{ path: '/m_1_2' }">
          Child Menu 2
        </MenuItem>
        <MenuItem label="1-3" :meta="{ path: '/m_1_3' }">
          Child Menu 3
        </MenuItem>
      </template>
    </MenuItem>
    <MenuItem
      label="2"
      :icon="City"
      disabled
      :meta="{ path: '/m_2' }"
    >
      Menu 2
    </MenuItem>
    <MenuItem label="3" :icon="ChartPie" :meta="{ path: '/m_3' }">
      Menu 3
    </MenuItem>
    <MenuItem label="4" :icon="User" :meta="{ path: '/m_4' }">
      Menu 4
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

function handleSelect(label: string, meta: { path: string }) {
  console.info(label, meta)
}
</script>
