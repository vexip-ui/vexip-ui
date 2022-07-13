<template>
  <Menu v-model:active="active" horizontal transfer>
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
          <template #group>
            <MenuItem label="1-3-1">
              Grandchild Menu 1
            </MenuItem>
            <MenuItem label="1-3-2">
              Grandchild Menu 2
            </MenuItem>
          </template>
        </MenuItem>
        <MenuItem label="1-4">
          Child Menu 4
        </MenuItem>
      </template>
    </MenuItem>
    <MenuGroup label="Group 1">
      <MenuItem label="2" :icon="City" disabled>
        Menu 2
      </MenuItem>
      <MenuItem label="3" :icon="ChartPie">
        Menu 3
      </MenuItem>
    </MenuGroup>
    <MenuItem label="4" :icon="User">
      Menu 4
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

const active = ref('')
</script>
