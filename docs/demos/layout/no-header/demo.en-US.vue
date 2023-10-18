<template>
  <Layout
    logo="https://www.vexipui.com/vexip-ui.svg"
    sign-name="Vexip UI"
    :user="user"
    :menu-props="{ router }"
    :no-header="!showHeader"
  >
    <template #main>
      <div style="margin-inline-start: 16px; margin-top: 16px">
        <Switch
          v-model:value="showHeader"
          open-text="Show header"
          close-text="Hide header"
        ></Switch>
      </div>
      <div style="width: 100%; padding: 0 20px">
        <p v-for="n in 40" :key="n">
          {{ n }}
        </p>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { ChartPie, City, EnvelopesBulk, User } from '@vexip-ui/icons'

import type { RouteLocationRaw } from 'vue-router'

const showHeader = ref(false)

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
</script>

<style scoped>
.vxp-layout {
  height: 500px;
}
</style>
