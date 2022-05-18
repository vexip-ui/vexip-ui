import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  ...useDemosRouter()
]

function useDemosRouter(): RouteRecordRaw[] {
  const demos = __DEMOS__

  const [first, ...others] = demos

  if (!first) {
    return []
  }

  return [
    {
      path: '/',
      name: first,
      component: () => import(`./demos/${first}.vue`)
    }
  ].concat(
    others.map(demo => {
      return {
        path: `/${demo}`,
        name: demo,
        component: () => import(`./demos/${demo}.vue`)
      }
    })
  )
}

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

router.afterEach(to => {
  document.title = `${__TARGET__} - ${typeof to.name === 'string' ? to.name : 'dev'} | Vexip UI`
})
