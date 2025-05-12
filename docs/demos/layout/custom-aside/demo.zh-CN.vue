<template>
  <Layout logo="https://www.vexipui.com/vexip-ui.svg" sign-name="Vexip UI" :user="user">
    <template #aside-main="{ reduced }">
      <Menu transfer :options="menus" :reduced="reduced"></Menu>
    </template>
    <template #aside-bottom="{ reduced, toggleReduced }">
      <div style="padding: 16px; cursor: pointer" @click="toggleReduced()">
        {{ reduced ? '展开菜单' : '收起菜单' }}
      </div>
    </template>
    <template #main>
      <div style="width: 100%; padding: 0 20px">
        <p v-for="n in 40" :key="n">
          {{ n }}
        </p>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ChartPie, City, EnvelopesBulk, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const user = {
  name: 'VexipUI',
  email: 'email@vexip-ui.com',
}

const menus: MenuOptions[] = [
  {
    label: '1',
    name: '菜单 1',
    icon: EnvelopesBulk,
    children: [
      { label: '1-1', name: '子菜单 1' },
      { label: '1-2', name: '子菜单 2' },
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

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
