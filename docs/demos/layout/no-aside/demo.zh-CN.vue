<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :menu-props="{ router }"
    :no-aside="!showAside"
  >
    <template #header-right>
      <div style="margin-inline-end: 24px">
        <Switch v-model:value="showAside" open-text="显示侧边栏" close-text="隐藏侧边栏"></Switch>
      </div>
    </template>
    <template #main>
      <div style="width: 100%; height: 1200px"></div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { ChartPie, City, EnvelopesBulk, User } from '@vexip-ui/icons'

import type { RouteLocationRaw } from 'vue-router'

const showAside = ref(false)

const user = {
  name: 'VexipUI',
  email: 'email@vexip-ui.com'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/m1',
      component: {},
      meta: {
        label: '1',
        name: '菜单 1',
        icon: EnvelopesBulk
      },
      children: [
        {
          path: 'c1',
          component: {},
          meta: {
            label: '1-1',
            name: '子菜单 1'
          }
        },
        {
          path: 'c2',
          component: {},
          meta: {
            label: '1-2',
            name: '子菜单 2'
          }
        }
      ]
    },
    {
      path: '/m2',
      component: {},
      meta: {
        label: '2',
        name: '菜单 2',
        icon: City
      }
    },
    {
      path: '/m3',
      component: {},
      meta: {
        label: '3',
        name: '菜单 3',
        icon: ChartPie
      }
    },
    {
      path: '/m4',
      component: {},
      meta: {
        label: '4',
        name: '菜单 4',
        icon: User
      }
    },
    {
      path: '/m5',
      component: {},
      meta: {
        menu: false
      }
    }
  ]
})

// 模拟 push 方法
router.push = async (to: RouteLocationRaw) => {
  console.info(to)
}
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
