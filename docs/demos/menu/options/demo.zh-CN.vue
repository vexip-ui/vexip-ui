<template>
  <Menu :options="options" style="max-width: 240px" @select="handleSelect"></Menu>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { Icon } from 'vexip-ui'
import { ChartPie, City, EnvelopesBulk, Marker, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const options: MenuOptions[] = [
  {
    label: '分组 1',
    group: true,
    children: [
      {
        label: '1',
        name: '菜单 1',
        icon: EnvelopesBulk,
        children: [
          { label: '1-1', name: '子菜单 1' },
          { label: '1-2', name: '子菜单 2' },
          { label: '1-3', name: '子菜单 3' }
        ]
      },
      {
        label: '2',
        name: '菜单 2',
        icon: City,
        disabled: true
      },
      {
        label: '3',
        name: '菜单 3',
        icon: ChartPie
      }
    ]
  },
  {
    label: '分组 2',
    group: true,
    children: [
      {
        label: '4',
        name: () => '菜单 4',
        icon: () => h(Icon, { icon: User }),
        meta: {
          parent: true,
          label: '4'
        }
      },
      {
        label: '5',
        name: '菜单 5',
        icon: Marker,
        meta: { parent: true },
        children: [{ label: '5-1', name: '子菜单 5-1', meta: { child: true } }]
      },
      {
        label: '6',
        name: '菜单 6',
        icon: Marker,
        meta: { parent: true },
        onlyOne: true,
        children: [{ label: '6-1', name: '子菜单 6-1', meta: { child: true } }]
      }
    ]
  }
]

function handleSelect(label: string, meta: object) {
  console.info(label, meta)
}
</script>
