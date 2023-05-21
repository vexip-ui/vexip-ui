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
      <div style="width: 100%; height: 1200px; padding: 20px">
        点击右上角头像
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
  User
} from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const user = {
  name: 'VexipUI',
  email: 'email@vexip-ui.com'
}

const actions = [
  {
    label: 'profile',
    icon: IdBadgeR,
    name: '个人资料'
  },
  {
    label: 'message',
    icon: CommentDotsR,
    name: '你的消息'
  },
  {
    label: 'settings',
    icon: Gear,
    name: '帐号设置',
    divided: true
  },
  {
    label: 'signOut',
    name: '退出登录',
    icon: ArrowRightFromBracket
  }
]

const menus: MenuOptions[] = [
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
  },
  {
    label: '4',
    name: '菜单 4',
    icon: User
  }
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
