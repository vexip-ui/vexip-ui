import { createRouter, createWebHistory } from 'vue-router'
import { Loading } from 'vexip-ui'
import { toKebabCase } from '@vexip-ui/utils'
import { getGuideConfig } from './guide'
import { getComponentConfig } from './components'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('../views/homepage.vue')
  },
  ...useGuideRouter(),
  ...useComponentsRouter()
]

function useGuideRouter(): RouteRecordRaw[] {
  const children: RouteRecordRaw[] = getGuideConfig().map(({ cname, label }) => {
    return {
      path: label,
      name: cname,
      component: () => import(`../guides/${label}/docs.vue`)
    }
  })

  children.unshift({ path: '', redirect: '/guide/' + children[0].path })

  return [
    {
      path: '/guide',
      component: () => import('../views/guide.vue'),
      children
    }
  ]
}

function useComponentsRouter(): RouteRecordRaw[] {
  const children: RouteRecordRaw[] = []

  getComponentConfig().forEach(group => {
    children.push(
      ...group.components.map(({ name, cname, ...others }) => {
        const lowerName = toKebabCase(name)

        return {
          path: lowerName,
          name: `${name} ${cname}`,
          meta: {
            ...others,
            component: `${name} ${cname}`
          },
          component: () => import(`../demos/${lowerName}/docs.vue`)
        }
      })
    )
  })

  children.unshift({ path: '', redirect: '/components/' + children[0].path })

  return [
    {
      path: '/components',
      component: () => import('../views/components.vue'),
      children
    }
  ]
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  Loading.open(5)
})

router.afterEach(to => {
  document.title =
    to.path !== '/' && typeof to.name === 'string'
      ? `${to.name} - Vexip UI`
      : 'Vexip UI - 创造有趣的开发体验'
  Loading.open(100)
})
