<template>
  <Menu
    horizontal
    transfer
    trigger="click"
    :options="options"
  ></Menu>
  <br />
  <Menu
    horizontal
    transfer
    :options="options"
    style="max-width: 360px;"
  ></Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User, Marker } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const options: MenuOptions[] = [
  {
    label: '1',
    name: '菜单 1',
    icon: EnvelopesBulk,
    children: [
      { label: '1-1', name: '子菜单 1', disabled: true },
      { label: '1-2', name: '子菜单 2' },
      {
        label: '1-3',
        name: '子菜单 3',
        children: [
          { label: '1-3-1', name: '三级菜单 1' },
          { label: '1-3-2', name: '三级菜单 2' }
        ]
      }
    ]
  },
  {
    label: '2',
    name: '菜单 2',
    icon: City
  },
  {
    label: '3',
    name: '菜单 3',
    icon: ChartPie,
    disabled: true
  },
  {
    label: '4',
    name: '菜单 4',
    icon: User,
    children: [
      { label: '4-1', name: '子菜单 1' },
      { label: '4-2', name: '子菜单 2', disabled: true },
      { label: '4-3', name: '子菜单 3' }
    ]
  },
  {
    label: '5',
    name: '菜单 5',
    icon: Marker
  }
]
</script>
