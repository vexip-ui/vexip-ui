import { createRouter, createWebHistory } from 'vue-router'
import { Loading } from 'vexip-ui'
import { toKebabCase } from '@vexip-ui/utils'
import { langOptions, i18n } from '../i18n'
import { getGuideConfig } from './guides'
import { getComponentConfig } from './components'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${i18n.global.locale || i18n.global.fallbackLocale}`
  },
  ...langOptions.map(useLanguageRouter)
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
  const children: RouteRecordRaw[] = getGuideConfig().map(({ label, i18n, ...others }) => {
    return {
      path: label,
      name: `${language}-${label}`,
      meta: { ...others, label, i18n },
      props: { name: label, language },
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
      ...group.components.map(({ name, ...others }) => {
        const lowerName = toKebabCase(name)

        return {
          path: lowerName,
          name: `${language}-${name}`,
          meta: {
            ...others,
            name,
            isComponent: true
          },
          props: { language, name: lowerName },
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
