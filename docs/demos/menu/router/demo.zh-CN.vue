<template>
  <Menu :router="router" style="max-width: 240px;" @select="handleSelect"></Menu>
</template>

<script setup lang="ts">
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'
// import { createRouter, createWebHistory } from 'vue-router'

// import type { RouteLocationRaw } from 'vue-router'

function createWebHistory() {
  //
}

function createRouter(options: any) {
  return { currentRoute: { value: '' }, options } as any
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
router.push = async (to: /* RouteLocationRaw */ any) => {
  console.info(to)
}

function handleSelect(label: string, meta: { path: string }) {
  console.info(label, meta)
}
</script>
