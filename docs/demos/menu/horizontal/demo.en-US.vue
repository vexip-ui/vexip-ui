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
    style="max-width: 360px"
  ></Menu>
</template>

<script setup lang="ts">
import { ChartPie, City, EnvelopesBulk, Marker, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const options: MenuOptions[] = [
  {
    label: '1',
    name: 'Menu 1',
    icon: EnvelopesBulk,
    children: [
      { label: '1-1', name: 'Child Menu 1' },
      { label: '1-2', name: 'Child Menu 2', disabled: true },
      {
        label: '1-3',
        name: 'Child Menu 3',
        children: [
          { label: '1-3-1', name: 'Grand Menu 1' },
          { label: '1-3-2', name: 'Grand Menu 2' },
        ],
      },
    ],
  },
  {
    label: '2',
    name: 'Menu 2',
    icon: City,
  },
  {
    label: '3',
    name: 'Menu 3',
    icon: ChartPie,
    disabled: true,
  },
  {
    label: '4',
    name: 'Menu 4',
    icon: User,
    children: [
      { label: '4-1', name: 'Child Menu 1' },
      { label: '4-2', name: 'Child Menu 2', disabled: true },
      { label: '4-3', name: 'Child Menu 3' },
    ],
  },
  {
    label: '5',
    name: 'Menu 5',
    icon: Marker,
  },
]
</script>
