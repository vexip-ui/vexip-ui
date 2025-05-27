<template>
  <div style="max-width: 240px">
    <Button style="margin-bottom: 20px" @click="reduced = !reduced">
      展开/收起
    </Button>
    <Menu :reduced="reduced" :options="options"></Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ChartPie, City, EnvelopesBulk, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const reduced = ref(false)
const options: MenuOptions[] = [
  {
    label: '1',
    name: '菜单 1',
    icon: EnvelopesBulk,
    children: [
      { label: '1-1', name: '子菜单 1' },
      {
        label: '1-2',
        name: '子菜单 2',
        children: [
          { label: '1-2-1', name: '子菜单 2-1' },
          { label: '1-2-2', name: '子菜单 2-2' },
          { label: '1-2-3', name: '子菜单 2-3' },
        ],
      },
      { label: '1-3', name: '子菜单 3' },
    ],
  },
  {
    label: '2',
    name: '菜单 2',
    icon: City,
    disabled: true,
  },
  {
    label: '3',
    name: '菜单 3',
    icon: ChartPie,
  },
  {
    label: '4',
    name: '菜单 4',
    icon: User,
  },
]
</script>
