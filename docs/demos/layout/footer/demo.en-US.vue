<template>
  <Layout
    footer
    logo="https://www.vexipui.com/logo.png"
    sign-name="Vexip UI"
    :user="user"
    :menus="menus"
    copyright="Vexip UI - by qmhc"
    :links="links"
  >
    <template #main>
      <div style="width: 100%; height: 800px; padding: 20px;">
        Scroll to the bottom
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import {
  EnvelopesBulk,
  City,
  ChartPie,
  User,
  GithubB,
  ClockRotateLeft,
  Bug,
  Chalkboard
} from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const user = {
  name: 'VexipUI',
  email: 'email@vexip-ui.com'
}

const menus: MenuOptions[] = [
  {
    label: '1',
    name: 'Menu 1',
    icon: EnvelopesBulk
  },
  {
    label: '2',
    name: 'Menu 2',
    icon: City
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

const links = [
  {
    name: 'Resources',
    children: [
      {
        name: 'Design Resources'
      },
      {
        name: 'Icon Library'
      },
      {
        name: 'Third-Party Libraries',
        subname: 'Not yet'
      }
    ]
  },
  {
    name: 'Help',
    children: [
      {
        name: 'GitHub',
        icon: GithubB
      },
      {
        name: 'Change Log',
        icon: ClockRotateLeft
      },
      {
        name: 'Common Issues',
        icon: Bug
      },
      {
        name: 'Contributing',
        icon: Chalkboard
      }
    ]
  },
  {
    name: 'Group',
    children: [{ name: 'Link' }, { name: 'Link' }, { name: 'Link' }]
  },
  {
    name: 'Group',
    children: [{ name: 'Link' }, { name: 'Link' }, { name: 'Link' }]
  }
]
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
