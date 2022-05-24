<template>
  <div style="width: 240px;">
    <Button style="margin-bottom: 20px;" @on-click="reduced = !reduced">
      展开/收起
    </Button>
    <Menu :reduced="reduced" transfer>
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
      <MenuItem label="2" :icon="City">
        菜单二
      </MenuItem>
      <MenuItem label="3" :icon="ChartPie">
        菜单三
      </MenuItem>
      <MenuItem label="4" :icon="User">
        菜单四
      </MenuItem>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

const reduced = ref(false)
</script>
