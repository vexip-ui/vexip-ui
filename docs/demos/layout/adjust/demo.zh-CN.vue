<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :menus="menus"
    :style="{
      '--vxp-layout-aside-width': `${width}px`,
      '--vxp-layout-header-height': `${height}px`
    }"
    @user-action="handleUserAction"
  >
    <template #main>
      <div style="width: 100%; padding: 0 20px">
        <p>边栏宽度：</p>
        <NumberInput v-model:value="width"></NumberInput>
        <p>头部高度：</p>
        <NumberInput v-model:value="height"></NumberInput>
        <p v-for="n in 40" :key="n">
          {{ n }}
        </p>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ChartPie, City, EnvelopesBulk, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui'

const width = ref(240)
const height = ref(55)

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

function handleUserAction(label: string) {
  console.info(label)
}
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}

.vxp-number-input {
  max-width: 240px;
}
</style>
