<template>
  <Menu v-model:active="active" horizontal transfer>
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
          <template #group>
            <MenuItem label="1-3-1">
              三级菜单一
            </MenuItem>
            <MenuItem label="1-3-2">
              三级菜单二
            </MenuItem>
          </template>
        </MenuItem>
        <MenuItem label="1-4">
          子菜单四
        </MenuItem>
      </template>
    </MenuItem>
    <MenuGroup label="分组一">
      <MenuItem label="2" :icon="City" disabled>
        菜单二
      </MenuItem>
      <MenuItem label="3" :icon="ChartPie">
        菜单三
      </MenuItem>
    </MenuGroup>
    <MenuItem label="4" :icon="User">
      菜单四
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

const active = ref('')
</script>
