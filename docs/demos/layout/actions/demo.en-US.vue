<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :actions="actions"
    :menus="menus"
    @user-action="handleUserAction"
  >
    <template #main>
      <div style="width: 100%; padding: 0 20px">
        <p>点击右上角头像</p>
        <p v-for="n in 40" :key="n">
          {{ n }}
        </p>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import {
  ArrowRightFromBracket,
  ChartPie,
  City,
  CommentDotsR,
  EnvelopesBulk,
  Gear,
  IdBadgeR,
  User,
} from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const user = {
  name: 'VexipUI',
  email: 'email@vexip-ui.com',
}

const actions = [
  {
    label: 'profile',
    icon: IdBadgeR,
    name: 'Your profile',
  },
  {
    label: 'message',
    icon: CommentDotsR,
    name: 'Your messages',
  },
  {
    label: 'settings',
    icon: Gear,
    name: 'Settings',
    divided: true,
  },
  {
    label: 'signOut',
    name: 'Sign out',
    icon: ArrowRightFromBracket,
  },
]

const menus: MenuOptions[] = [
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

function handleUserAction(label: string) {
  console.info(label)
}
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
