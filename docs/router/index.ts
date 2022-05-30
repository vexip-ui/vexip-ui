import { createRouter, createWebHistory } from 'vue-router'
import { Loading } from 'vexip-ui'
import { toKebabCase } from '@vexip-ui/utils'
import { getGuideConfig } from './guides'
import { getComponentConfig } from './components'

import type { RouteRecordRaw } from 'vue-router'

const langOptions = ['zh-CN', 'es-US']
const defaultLang = langOptions.find(l => l === navigator.language) || __ROLLBACK_LANG__

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${defaultLang}`
  },
  useLanguageRouter('zh-CN'),
  useLanguageRouter('en-US')
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: '/'
  // }
]

function useLanguageRouter(language: string): RouteRecordRaw {
  return {
    path: `/${language}`,
    name: language,
    props: { language },
    component: () => import('../views/provider.vue'),
    children: [
      {
        path: '',
        name: `${language}-homepage`,
        component: () => import('../views/homepage.vue')
      },
      ...useGuidesRouter(language),
      ...useComponentsRouter(language)
    ]
  }
}

function useGuidesRouter(language: string): RouteRecordRaw[] {
  const children: RouteRecordRaw[] = getGuideConfig().map(({ name, cname, label }) => {
    return {
      path: label,
      name: `${language}-${name}`,
      meta: { name, cname, label },
      props: { name: toKebabCase(label), language },
      // component: () => import(`../guides/${label}/docs.vue`)
      component: () => import('../common/guide-doc.vue')
    }
  })

  if (!children.length) return []

  children.unshift({ path: '', redirect: { name: children[0].name } })

  return [
    {
      path: 'guides',
      props: { language },
      component: () => import('../views/guides.vue'),
      children
    }
  ]
}

function useComponentsRouter(language: string): RouteRecordRaw[] {
  const children: RouteRecordRaw[] = []

  getComponentConfig().forEach(group => {
    children.push(
      ...group.components.map(({ name, cname, ...others }) => {
        const lowerName = toKebabCase(name)

        return {
          path: lowerName,
          name: `${language}-${name}`,
          meta: {
            ...others,
            component: `${name} ${cname}`
          },
          props: { language, name: lowerName },
          // component: () => import(`../demos/${lowerName}/docs.vue`)
          component: () => import('../common/component-doc.vue')
        }
      })
    )
  })

  if (!children.length) return []

  children.unshift({ path: '', redirect: { name: children[0].name } })

  return [
    {
      path: 'components',
      props: { language },
      component: () => import('../views/components.vue'),
      children
    }
  ]
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeResolve(() => {
  Loading.open(5)
})

router.afterEach(to => {
  document.title =
    to.path !== '/' && typeof to.name === 'string'
      ? `${to.name} - Vexip UI`
      : 'Vexip UI - 创造有趣的开发体验'
  requestAnimationFrame(() => Loading.open(100))
})
