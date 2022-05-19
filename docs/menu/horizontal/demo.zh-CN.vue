<template>
  <Menu v-model:active="active" horizontal transfer>
    <MenuItem label="1" icon="mail-bulk">
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
              三级菜单一
            </MenuItem>
          </template>
        </MenuItem>
        <MenuItem label="1-4">
          子菜单四
        </MenuItem>
      </template>
    </MenuItem>
    <MenuGroup label="分组一">
      <MenuItem label="2" icon="chart-pie">
        菜单二
      </MenuItem>
      <MenuItem label="3" icon="user">
        菜单三
      </MenuItem>
    </MenuGroup>
    <MenuItem label="4" icon="user">
      菜单四
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref('')

    return { active }
  }
})
</script>
