<template>
  <Layout
    footer
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :menus="menus"
    copyright="Vexip UI - made with ❤️ by qmhc"
    :links="links"
  >
    <template #main>
      <div style="width: 100%; padding: 0 20px">
        <p>滚动到最下方</p>
        <p v-for="n in 20" :key="n">
          ↓
        </p>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import {
  Bug,
  Chalkboard,
  ChartPie,
  City,
  ClockRotateLeft,
  EnvelopesBulk,
  GithubB,
  User,
} from '@vexip-ui/icons'

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
  },
  {
    label: '2',
    name: '菜单 2',
    icon: City,
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

const links = [
  {
    name: '资源',
    children: [
      {
        name: '设计资源',
      },
      {
        name: '图标库',
      },
      {
        name: '社区资源',
        subname: '还没有',
      },
    ],
  },
  {
    name: '帮助',
    children: [
      {
        name: 'GitHub',
        icon: GithubB,
      },
      {
        name: '更新日志',
        icon: ClockRotateLeft,
      },
      {
        name: '报告 Bug',
        icon: Bug,
      },
      {
        name: '贡献指南',
        icon: Chalkboard,
      },
    ],
  },
  {
    name: '分组',
    children: [{ name: '链接' }, { name: '链接' }, { name: '链接' }],
  },
  {
    name: '分组',
    children: [{ name: '链接' }, { name: '链接' }, { name: '链接' }],
  },
]
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
