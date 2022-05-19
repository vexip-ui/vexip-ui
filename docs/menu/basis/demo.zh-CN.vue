<template>
  <div style="width: 240px;">
    <Menu>
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
          </MenuItem>
        </template>
      </MenuItem>
      <MenuItem label="2" icon="city" disabled>
        菜单二
      </MenuItem>
      <MenuItem label="3" icon="chart-pie">
        菜单三
      </MenuItem>
      <MenuItem label="4" icon="user">
        菜单四
      </MenuItem>
    </Menu>
  </div>
</template>
