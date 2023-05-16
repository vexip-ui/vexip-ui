<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :menus="menus"
    header-fixed="min"
    aside-fixed="min"
  >
    <template #main>
      <div style="width: 100%; height: 1200px; padding: 20px">
        <p>Click the bottom left caret</p>
        <p>And scroll back and forth</p>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ChartPie, City, EnvelopesBulk, Marker, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const user = {
  name: 'VexipUI',
  email: 'email@vexip-ui.com'
}

const menus: MenuOptions[] = [
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
  },
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
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
