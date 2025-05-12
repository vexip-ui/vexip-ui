<template>
  <Breadcrumb :router="router"></Breadcrumb>
</template>

<script setup lang="ts">
// import { createRouter, createWebHistory } from 'vue-router'

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
      },
      children: [
        {
          path: 'c1',
          name: '子菜单 1',
          component: {},
          meta: {
            label: '1-1',
          },
          children: [
            {
              path: 'cc1',
              component: {},
              meta: {
                name: '子菜单 1-1',
              },
            },
          ],
        },
      ],
    },
  ],
})

// 模拟 push 方法
router.push = async (to: /* RouteLocationRaw */ any) => {
  router.currentRoute.value = {
    matched: [
      {
        path: '/m1',
        meta: {
          label: '1',
          name: '菜单 1',
        },
      },
      {
        path: '/m1/c1',
        name: '子菜单 1',
        meta: {
          label: '1-1',
        },
      },
      {
        path: '/m1/c1/cc1',
        meta: {
          name: '子菜单 1-1',
        },
      },
    ],
  }
}

router.push('/m1/c1/cc1')
</script>
