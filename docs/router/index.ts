import { Loading } from 'vexip-ui'
import { isClient, toKebabCase } from '@vexip-ui/utils'
import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { defaultLanguage, langOptions, i18n } from '../i18n'
import { getGuideConfig } from './guides'
import { getComponentConfig } from './components'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${defaultLanguage || __ROLLBACK_LANG__}`
  },
  ...langOptions.map(useLanguageRouter),
  {
    path: '/:catchAll(.*)',
    component: () => import('../views/provider.vue'),
    children: [
      {
        path: '',
        name: 'NotFound',
        component: () => import('../views/not-found.vue')
      }
    ]
  }
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
      meta: { ...others, label, i18n, title: `guides.${i18n}` },
      props: { name: label, language },
      component: () => import('../common/guide-doc.vue')
    }
  })

  if (!children.length) return []

  children.unshift({ path: '', redirect: { name: children[0].name as string } })

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
            title: `components.${name}`,
            isComponent: true
          },
          props: { language, name: lowerName },
          component: () => import('../common/component-doc.vue')
        }
      })
    )
  })

  if (!children.length) return []

  children.unshift({ path: '', redirect: { name: children[0].name as string } })

  return [
    {
      path: 'components',
      props: { language },
      component: () => import('../views/components.vue'),
      children
    }
  ]
}

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  router.beforeResolve(() => {
    Loading.open(5)
  })

  if (isClient) {
    router.afterEach(to => {
      requestAnimationFrame(() => {
        document.title = to.meta.title
          ? `${i18n.global.t(to.meta.title as string)} - Vexip UI`
          : `Vexip UI - ${i18n.global.t('common.makeInterest')}`
        Loading.open(100)
      })
    })
  }

  return router
}
