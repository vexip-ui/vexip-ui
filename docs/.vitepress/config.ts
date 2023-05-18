import { getGuideConfig } from './config/guide'
import { getComponentConfig } from './config/component'
import { highlight } from '../build/highlight'
import { markdownItSetup } from '../build/markdown'
import { toKebabCase } from '@vexip-ui/utils'
import * as compiler from '@vue/compiler-sfc'

import type { UserConfig } from 'vitepress'
import type { ThemeConfig } from './theme/types'

compiler.parseCache.max = 10000

export default <UserConfig<ThemeConfig>>{
  srcExclude: ['demos', 'guides', 'README.md'],
  ignoreDeadLinks: true,
  titleTemplate: 'Vexip UI',
  lastUpdated: true,
  head: [
    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['meta', { 'http-equiv': 'Pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vexip-ui.svg' }]
  ],
  markdown: {
    highlight,
    config: markdownItSetup
  },
  vue: {
    template: {
      ssr: true
    },
    compiler: compiler as any
  },
  themeConfig: {
    /**
     * 自定义配置信息
     * asideMenus 侧边栏菜单
     */
    asideMenus: getAsideMenus(),

    nav: [
      { key: 'guides', i18n: 'common.guides', link: '/guide/vexip-ui', activeMatch: '/guide/' },
      {
        key: 'components',
        i18n: 'common.components',
        link: '/component/button',
        activeMatch: '/component/'
      },
      { key: 'playground', i18n: 'common.playground', link: 'https://playground.vexipui.com' }
    ],
    outline: {
      '/guide/': 2,
      '/component/': 3
    },
    editLink: {
      pattern: 'https://github.com/vexip-ui/vexip-ui/edit/main/docs/:path'
    }
  },
  locales: {
    'en-US': {
      label: 'en-US',
      lang: 'en-US'
    },
    'zh-CN': {
      label: 'zh-CN',
      lang: 'zh-CN'
    }
  }
}

function getAsideMenus() {
  return {
    // '/guide/': getGuideConfig().map(guide => {
    //   return {
    //     key: guide.name,
    //     link: `/guide/${guide.name}`,
    //     i18n: `guide.${guide.i18n}`
    //   }
    // }),
    '/guide/': getGuideConfig().map(group => {
      return {
        key: group.name,
        i18n: `guide.${group.name}`,
        items: group.guides.map(guide => {
          return {
            key: guide.name,
            link: `/guide/${guide.name}`,
            i18n: `guide.${guide.i18n}`
          }
        })
      }
    }),
    '/component/': getComponentConfig().map(group => {
      return {
        key: group.name,
        i18n: `group.${group.name}`,
        count: true,
        items: group.components.map(component => ({
          key: component.name,
          link: `/component/${toKebabCase(component.name)}`,
          i18n: `component.${component.name}`,
          since: component.since,
          origin: component.name
        }))
      }
    })
  }
}
