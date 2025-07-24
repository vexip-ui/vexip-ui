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
        name: 'Menu 1',
      },
      children: [
        {
          path: 'c1',
          name: 'Child Menu 1',
          component: {},
          meta: {
            label: '1-1',
          },
          children: [
            {
              path: 'cc1',
              component: {},
              meta: {
                name: 'Child Menu 1-1',
              },
            },
          ],
        },
      ],
    },
  ],
})

// mock the push method
router.push = async (_to: /* RouteLocationRaw */ any) => {
  router.currentRoute.value = {
    matched: [
      {
        path: '/m1',
        meta: {
          label: '1',
          name: 'Menu 1',
        },
      },
      {
        path: '/m1/c1',
        name: 'Child Menu 1',
        meta: {
          label: '1-1',
        },
      },
      {
        path: '/m1/c1/cc1',
        meta: {
          name: 'Child Menu 1-1',
        },
      },
    ],
  }
}

router.push('/m1/c1/cc1')
</script>
