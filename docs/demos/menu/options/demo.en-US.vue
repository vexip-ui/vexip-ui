<template>
  <Menu :options="options" style="width: 240px;" @select="handleSelect"></Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User, Marker } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui/es/menu'

const options: MenuOptions[] = [
  {
    label: 'Group 1',
    group: true,
    children: [
      {
        label: '1',
        name: 'Menu 1',
        icon: EnvelopesBulk,
        children: [
          { label: '1-1', name: 'Child Menu 1' },
          { label: '1-2', name: 'Child Menu 2' },
          { label: '1-3', name: 'Child Menu 3' }
        ]
      },
      {
        label: '2',
        name: 'Menu 2',
        icon: City,
        disabled: true
      },
      {
        label: '3',
        name: 'Menu 3',
        icon: ChartPie
      }
    ]
  },
  {
    label: 'Group 2',
    group: true,
    children: [
      {
        label: '4',
        name: 'Menu 4',
        icon: User
      },
      {
        label: '5',
        name: 'Menu 5',
        icon: Marker
      }
    ]
  }
]

function handleSelect(label: string) {
  console.info(label)
}
</script>
