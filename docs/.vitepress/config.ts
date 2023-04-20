import { toKebabCase } from '@vexip-ui/utils'
import { highlight } from './build/highlight'
import { markdownItSetup } from './build/markdown'
import { getGuideConfig } from './config/guide'
import { getComponentConfig } from './config/component'

import type { UserConfig } from 'vitepress'

export default <UserConfig>{
  head: [
    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['meta', { 'http-equiv': 'Pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vexip-ui.svg' }]
  ],
  titleTemplate: 'Vexip UI',
  markdown: {
    highlight,
    config: markdownItSetup
  },
  themeConfig: {
    /**
     * 自定义配置信息
     * asideMenus 侧边栏菜单
     */
    asideMenus: getAsideMenus(),

    nav: [
      { key: 'guides', i18n: 'common.guides', link: '/guide/setup', activeMatch: '/guide/' },
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
    '/guide/': getGuideConfig().map(guide => {
      return {
        key: guide.name,
        link: `/guide/${guide.name}`,
        i18n: `guide.${guide.i18n}`
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
