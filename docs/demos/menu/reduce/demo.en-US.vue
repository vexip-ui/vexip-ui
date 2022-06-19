<template>
  <div style="width: 240px;">
    <Button style="margin-bottom: 20px;" @click="reduced = !reduced">
      Expand/Reduce
    </Button>
    <Menu :reduced="reduced" transfer>
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
          </MenuItem>
        </template>
      </MenuItem>
      <MenuItem label="2" :icon="City">
        Menu 2
      </MenuItem>
      <MenuItem label="3" :icon="ChartPie">
        Menu 3
      </MenuItem>
      <MenuItem label="4" :icon="User">
        Menu 4
      </MenuItem>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

const reduced = ref(false)
</script>
