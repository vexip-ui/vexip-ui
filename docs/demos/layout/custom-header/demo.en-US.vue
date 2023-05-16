<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :menus="menus"
    :config="['color']"
    @user-action="handleUserAction"
  >
    <template #header-left="{ reduced, toggleReduced }">
      <div style="display: flex; cursor: pointer" @click="toggleReduced()">
        <Icon :icon="reduced ? Indent : Outdent"></Icon>
      </div>
    </template>
    <template #header-right>
      <Linker to="https://github.com/vexip-ui/vexip-ui" style="display: flex; margin-right: 16px">
        <Icon :scale="1.6">
          <GithubB></GithubB>
        </Icon>
      </Linker>
    </template>
    <template #aside-bottom>
      <span></span>
    </template>
    <template #main>
      <div style="width: 100%; height: 1200px"></div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ChartPie, City, EnvelopesBulk, GithubB, Indent, Outdent, User } from '@vexip-ui/icons'

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
