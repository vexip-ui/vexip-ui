<template>
  <!-- 假设这个 div 是 document -->
  <div style="height: 500px; overflow: hidden auto">
    <!-- 开启 fit-window 后，--vxp-layout-view-height 将为 100vh，此处因需模拟将其强制设置为 500px -->
    <Layout
      logo="https://www.vexipui.com/vexip-ui.svg"
      sign-name="Vexip UI"
      :user="user"
      :menus="menus"
      fit-window
      style="--vxp-layout-view-height: 500px"
      @user-action="handleUserAction"
    >
      <template #main>
        <div style="width: 100%; padding: 0 20px">
          <p v-for="n in 40" :key="n">
            {{ n }}
          </p>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { ChartPie, City, EnvelopesBulk, Marker, User } from '@vexip-ui/icons'

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
  {
    label: '5',
    name: '菜单 5',
    icon: Marker,
  },
]

function handleUserAction(label: string) {
  console.info(label)
}
</script>
