<template>
  <div style="max-width: 240px">
    <Button style="margin-bottom: 20px" @click="reduced = !reduced">
      Expand/Reduce
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
    name: 'Menu 1',
    icon: EnvelopesBulk,
    children: [
      { label: '1-1', name: 'Child Menu 1' },
      { label: '1-2', name: 'Child Menu 2' },
      { label: '1-3', name: 'Child Menu 3' },
    ],
  },
  {
    label: '2',
    name: 'Menu 2',
    icon: City,
    disabled: true,
  },
  {
    label: '3',
    name: 'Menu 3',
    icon: ChartPie,
  },
  {
    label: '4',
    name: 'Menu 4',
    icon: User,
  },
]
</script>
