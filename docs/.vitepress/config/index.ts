import * as compiler from '@vue/compiler-sfc'

import { getPackageInfoSync, resolveModule } from 'local-pkg'
import { compare } from 'compare-versions'
import { highlight } from '../build/highlight'
import { markdownItSetup } from '../build/markdown'
import { getComponentConfig } from './component'
import { getGuideConfig } from './guide'
import { getHeadConfig } from './head'
import { toKebabCase } from '@vexip-ui/utils'

import type { UserConfig } from 'vitepress'
import type { ThemeConfig } from '../theme/types'

compiler.parseCache.max = 10000

const SITE_DESC =
  'A Vue 3 UI library, highly customizability, full TypeScript, performance pretty good.'
const SITE_TITLE = 'Vexip UI - Make interesting in development'
const SITE_DESC_ZH = '一个 Vue 3 组件库，高度可定制化，全量 TypeScript，性能很不错。'
const SITE_TITLE_ZH = 'Vexip UI - 创造有趣的开发体验'

export default <UserConfig<ThemeConfig>>{
  titleTemplate: 'Vexip UI',
  lastUpdated: true,
  head: getHeadConfig(),
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
      description: SITE_DESC,
      head: [
        ['meta', { property: 'og:description', content: SITE_DESC }],
        ['meta', { property: 'og:title', content: SITE_TITLE }]
      ],
      themeConfig: {
        footerLinks: getFooterLinks('en-US')
      }
    },
    'zh-CN': {
      label: '中文',
      lang: 'zh-CN',
      description: SITE_DESC_ZH,
      head: [
        ['meta', { property: 'og:description', content: SITE_DESC_ZH }],
        ['meta', { property: 'og:title', content: SITE_TITLE_ZH }]
      ],
      themeConfig: {
        footerLinks: getFooterLinks('zh-CN')
      }
    }
  }
}

let version: string | undefined

function queryLibVersion() {
  if (version) return version

  try {
    version =
      getPackageInfoSync('vexip-ui')?.version ??
      getPackageInfoSync('vexip-ui', { paths: [resolveModule('vexip-ui') || process.cwd()] })
        ?.version
  } catch (e) {
    console.error(e)
  }

  if (!version) {
    throw new Error('[vexip-ui:docs] failed to load vexip-ui version, please check')
  }

  return version
}

function getAsideMenus(): ThemeConfig['asideMenus'] {
  const minorVersion = queryLibVersion().split('.').slice(0, 2).join('.') + '.x'

  const getTagConfig = (since?: string) => {
    if (!since) return ''

    return compare(since, minorVersion, '=')
      ? {
          tag: 'New',
          tagType: 'error' as const
        }
      : compare(since, minorVersion, '>')
        ? {
            tag: 'Coming',
            tagType: 'warning' as const
          }
        : {}
  }

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
          ...getTagConfig(component.since),
          key: component.name,
          link: `/component/${toKebabCase(component.name)}`,
          text: component.name,
          subI18n: `component.${component.name}`,
          noSub: ['en-US']
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
          subI18n: t('lintConfigSet'),
          link: 'https://github.com/vexip-ui/lint-config'
        },
        {
          text: 'Create Vexip',
          subI18n: t('createProject'),
          link: 'https://github.com/vexip-ui/create-vexip'
        },
        {
          text: 'Vexip Scripts',
          subI18n: t('releaseScripts'),
          link: 'https://github.com/vexip-ui/vexip-ui/tree/main/common/scripts'
        },
        {
          text: 'Grid Layout Plus',
          subI18n: t('gridLayout'),
          link: `https://grid-layout-plus.netlify.app/${lang === 'zh-CN' ? 'zh/' : ''}`
        },
        {
          text: 'vite-plugin-dts',
          link: 'https://github.com/qmhc/vite-plugin-dts'
        },
        {
          text: 'vue-hooks-plus',
          subI18n: t('hooksLib'),
          link: `https://inhiblabcore.github.io/docs/hooks/${lang !== 'zh-CN' ? 'en/' : ''}`
        },
        {
          text: 'Vexip SFC Playground',
          link: 'https://playground.vexipui.com/'
        },
        {
          text: 'RedBlues-1980',
          subI18n: t('logoDesign'),
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
