<template>
  <Menu :router="router" style="max-width: 240px;" @select="handleSelect"></Menu>
</template>

<script setup lang="ts">
import { createRouter, createWebHistory } from 'vue-router'
import { EnvelopesBulk, City, ChartPie, User } from '@vexip-ui/icons'

import type { RouteLocationRaw } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/m1',
      component: {},
      meta: {
        label: '1',
        name: 'Menu 1',
        icon: EnvelopesBulk
      },
      children: [
        {
          path: 'c1',
          component: {},
          meta: {
            label: '1-1',
            name: 'Child Menu 1'
          }
        },
        {
          path: 'c2',
          component: {},
          meta: {
            label: '1-2',
            name: 'Child Menu 2'
          }
        }
      ]
    },
    {
      path: '/m2',
      component: {},
      meta: {
        label: '2',
        name: 'Menu 2',
        icon: City
      }
    },
    {
      path: '/m3',
      component: {},
      meta: {
        label: '3',
        name: 'Menu 3',
        icon: ChartPie
      }
    },
    {
      path: '/m4',
      component: {},
      meta: {
        label: '4',
        name: 'Menu 4',
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

// mock the push method
router.push = async (to: RouteLocationRaw) => {
  console.info(to)
}

function handleSelect(label: string, meta: { path: string }) {
  console.info(label, meta)
}
</script>
