<template>
  <Layout
    logo="https://www.vexipui.com/logo.png"
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
      <div style="width: 100%; height: 1200px; padding: 20px;">
        <p>Adise width:</p>
        <NumberInput v-model:value="width"></NumberInput>
        <p>Header height:</p>
        <NumberInput v-model:value="height"></NumberInput>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

import type { MenuOptions } from 'vexip-ui/es/menu'

const width = ref(240)
const height = ref(55)

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

.vxp-number-input {
  max-width: 240px;
}
</style>
