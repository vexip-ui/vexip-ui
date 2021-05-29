<template>
  <div style="width: 240px;">
    <Button style="margin-bottom: 20px;" @on-click="reduced = !reduced">
      展开/收起
    </Button>
    <Menu v-model:active="active" :reduced="reduced">
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
      <MenuItem label="2" icon="city">
        菜单二
      </MenuItem>
      <MenuGroup label="分组一">
        <MenuItem label="3" icon="chart-pie">
          菜单三
        </MenuItem>
        <MenuItem label="4" icon="user">
          菜单四
        </MenuItem>
      </MenuGroup>
      <MenuItem label="5" icon="cart-plus">
        菜单五
      </MenuItem>
    </Menu>
    <br />
    <p>
      Menu Active:
      {{ active }}
    </p>
  </div>
  <Menu v-model:active="active" horizontal :reduced="reduced">
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
      <MenuItem label="3" icon="chart-pie">
        菜单三
      </MenuItem>
      <MenuItem label="4" icon="user">
        菜单四
      </MenuItem>
    </MenuGroup>
    <MenuItem label="4" icon="user">
      菜单四
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import Menu from '../menu.vue'
import MenuGroup from '../menu-group.vue'
import MenuItem from '../menu-item.vue'

import '@/common/icons/mail-bulk'
import '@/common/icons/city'
import '@/common/icons/chart-pie'
import '@/common/icons/user'
import '@/common/icons/cart-plus'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Menu,
    MenuGroup,
    MenuItem
  },
  data() {
    return {
      active: '',
      reduced: false
    }
  }
})
</script>

<style lang="scss">
.vxp-select {
  width: 300px;
}
</style>
