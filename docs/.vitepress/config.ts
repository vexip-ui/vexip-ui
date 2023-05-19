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
    },

    footerLinks: []
  },
  locales: {
    'en-US': {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        footerLinks: getFooterLinks('en-US')
      }
    },
    'zh-CN': {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        footerLinks: getFooterLinks('zh-CN')
      }
    }
  }
}

function getAsideMenus(): ThemeConfig['asideMenus'] {
  return {
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

function getFooterLinks(lang: 'zh-CN' | 'en-US'): ThemeConfig['footerLinks'] {
  const t = (s: string) => `footer.${s}`

  return [
    {
      i18n: t('resources'),
      items: [
        {
          text: 'Vexip Nuxt Module',
          link: 'https://github.com/vexip-ui/nuxt'
        },
        {
          text: 'Vexip Lint Config',
          subi18n: t('lintConfigSet'),
          link: 'https://github.com/vexip-ui/lint-config'
        },
        {
          text: 'Create Vexip',
          subi18n: t('createProject'),
          link: 'https://github.com/vexip-ui/create-vexip'
        },
        {
          text: 'Grid Layout Plus',
          subi18n: t('gridLayout'),
          link: `https://grid-layout-plus.netlify.app/${lang === 'zh-CN' ? 'zh/' : ''}`
        },
        {
          text: 'vite-plugin-dts',
          link: 'https://github.com/qmhc/vite-plugin-dts'
        },
        {
          text: 'vue-hooks-plus',
          subi18n: t('hooksLib'),
          link: `https://inhiblabcore.github.io/docs/hooks/${lang !== 'zh-CN' ? 'en/' : ''}`
        },
        {
          text: 'Vexip SFC Playground',
          link: 'https://playground.vexipui.com/'
        },
        {
          text: 'RedBlues-1980',
          subi18n: t('logoDesign'),
          link: 'https://richuangangban1980.lofter.com/'
        }
      ]
    },
    {
      i18n: t('help'),
      items: [
        {
          text: 'GitHub',
          link: 'https://github.com/vexip-ui/vexip-ui'
        },
        {
          i18n: t('changelog'),
          link: 'https://github.com/vexip-ui/vexip-ui/blob/main/CHANGELOG.md'
        },
        {
          i18n: t('issue'),
          link: 'https://github.com/vexip-ui/vexip-ui/issues'
        },
        {
          i18n: t('contribute'),
          link: 'https://github.com/vexip-ui/vexip-ui/blob/main/CONTRIBUTING.md'
        },
        {
          i18n: t('qqGroup'),
          link: 'https://jq.qq.com/?_wv=1027&k=5KlA84xG'
        },
        {
          i18n: t('sponsor'),
          link:
            lang === 'zh-CN'
              ? '/zh-CN/guide/vexip-ui.html#%E8%B4%A1%E7%8C%AE'
              : '/en-US/guide/vexip-ui.html#contributing'
        }
      ]
    }
  ]
}
