// import * as compiler from '@vue/compiler-sfc'

import { withPwa } from '@vite-pwa/vitepress'

import { defineConfigWithTheme } from 'vitepress'
import { getPackageInfoSync, resolveModule } from 'local-pkg'
import { compare } from 'compare-versions'
import { toKebabCase } from '@vexip-ui/utils'
import { highlight } from '../build/highlight'
import { markdownItSetup } from '../build/markdown'
import { getComponentConfig } from './component'
import { SITE_DESC, SITE_DESC_ZH, SITE_NAME, SITE_TITLE, SITE_TITLE_ZH } from './constant'
import { getGuideConfig } from './guide'
import { getHeadConfig } from './head'
import { getUpdatedFiles } from './updated'
import { getPwaConfig } from './pwa'

import type { AsideMenuTag, ThemeConfig } from '../theme/types'

// compiler.parseCache.max = 10000

export default async () => {
  const updated = await getUpdatedFiles()

  return withPwa(
    defineConfigWithTheme<ThemeConfig>({
      titleTemplate: SITE_NAME,
      lastUpdated: true,
      head: getHeadConfig(),
      markdown: {
        highlight,
        config: markdownItSetup,
      },
      vue: {
        // compiler: compiler as any,
        template: {
          compilerOptions: {
            isCustomElement: tag => tag === 'iconify-icon',
          },
        },
      },
      themeConfig: {
        asideMenus: {},
        nav: [
          { key: 'guides', i18n: 'common.guides', link: '/guide/vexip-ui', activeMatch: '/guide/' },
          {
            key: 'components',
            i18n: 'common.components',
            link: '/component/button',
            activeMatch: '/component/',
          },
          { key: 'playground', i18n: 'common.playground', link: 'https://play.vexipui.com' },
          {
            key: 'ecosystem',
            i18n: 'common.ecosystem',
            items: [
              {
                key: 'official',
                i18n: 'common.official',
                items: [
                  {
                    key: 'create-vexip',
                    text: 'Create Vexip',
                    link: 'https://github.com/vexip-ui/create-vexip',
                  },
                  {
                    key: 'nuxt-module',
                    text: 'Vexip Nuxt Module',
                    link: 'https://github.com/vexip-ui/nuxt',
                  },
                  {
                    key: 'lint-config',
                    text: 'Vexip Lint Config',
                    link: 'https://github.com/vexip-ui/lint-config',
                  },
                ],
              },
              {
                key: 'partnership',
                i18n: 'common.partnership',
                items: [
                  {
                    key: 'fantastic-admin',
                    text: 'Fantastic-admin',
                    link: 'https://fantastic-admin.gitee.io/',
                  },
                  {
                    key: 'grid-layout-plus',
                    text: 'Grid Layout Plus',
                    link: 'https://grid-layout-plus.netlify.app/',
                  },
                  {
                    key: 'become-partner',
                    i18n: 'common.becomePartner',
                    link: 'mailto:544022268@qq.com',
                  },
                ],
              },
            ],
          },
        ],
        outline: {
          '/guide/': [2, 3],
          '/component/': [2, 3],
        },
        editLink: {
          pattern: 'https://github.com/vexip-ui/vexip-ui/edit/main/docs/:path',
        },
        footerLinks: [],
      },
      locales: {
        'en-US': {
          label: 'English',
          lang: 'en-US',
          description: SITE_DESC,
          head: [
            ['meta', { property: 'og:description', content: SITE_DESC }],
            ['meta', { property: 'og:title', content: SITE_TITLE }],
          ],
          themeConfig: {
            asideMenus: getAsideMenus(updated['en-US']),
            footerLinks: getFooterLinks('en-US'),
          },
        },
        'zh-CN': {
          label: '中文',
          lang: 'zh-CN',
          description: SITE_DESC_ZH,
          head: [
            ['meta', { property: 'og:description', content: SITE_DESC_ZH }],
            ['meta', { property: 'og:title', content: SITE_TITLE_ZH }],
          ],
          themeConfig: {
            asideMenus: getAsideMenus(updated['zh-CN']),
            footerLinks: getFooterLinks('zh-CN'),
          },
        },
      },
      pwa: getPwaConfig,
    }),
  )
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

function getAsideMenus(updatedFiles?: Set<string>): ThemeConfig['asideMenus'] {
  const minorVersion = queryLibVersion().split('.').slice(0, 2).join('.') + '.x'

  const getTagConfig = (link: string, since?: string) => {
    const tags: AsideMenuTag[] = []

    if (since) {
      if (compare(since, minorVersion, '>')) {
        return [
          {
            text: 'Coming',
            type: 'warning' as const,
          },
        ]
      }
      const tag = compare(since, minorVersion, '=')
        ? {
            text: 'New',
            type: 'error' as const,
          }
        : null

      tag && tags.push(tag)
    }

    if (updatedFiles?.size && updatedFiles.has(link)) {
      tags.push({
        text: 'Updated',
        type: 'success' as const,
      })
    }

    return tags
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
            i18n: `guide.${guide.i18n}`,
            tags: getTagConfig(`/guide/${guide.name}`),
          }
        }),
      }
    }),
    '/component/': getComponentConfig().map(group => {
      return {
        key: group.name,
        i18n: `group.${group.name}`,
        count: true,
        items: group.components.map(component => {
          const link = `/component/${toKebabCase(component.name)}`

          return {
            key: component.name,
            link,
            text: component.name,
            subI18n: `component.${component.name}`,
            noSub: ['en-US'],
            tags: getTagConfig(link, component.since),
          }
        }),
      }
    }),
  }
}

function getFooterLinks(lang: 'zh-CN' | 'en-US'): ThemeConfig['footerLinks'] {
  const t = (s: string) => `footer.${s}`

  return [
    {
      i18n: t('resources'),
      items: [
        {
          text: 'Create Vexip',
          subI18n: t('createProject'),
          link: 'https://github.com/vexip-ui/create-vexip',
        },
        {
          text: 'Vexip Nuxt Module',
          link: 'https://github.com/vexip-ui/nuxt',
        },
        {
          text: 'Vexip Lint Config',
          subI18n: t('lintConfigSet'),
          link: 'https://github.com/vexip-ui/lint-config',
        },
        {
          text: 'Vexip Scripts',
          subI18n: t('releaseScripts'),
          link: 'https://github.com/vexip-ui/vexip-ui/tree/main/common/scripts',
        },
        {
          text: 'Vexip SFC Playground',
          link: 'https://play.vexipui.com/',
        },
        {
          text: 'Grid Layout Plus',
          subI18n: t('gridLayout'),
          link: `https://grid-layout-plus.netlify.app/${lang === 'zh-CN' ? 'zh/' : ''}`,
        },
        {
          text: 'vite-plugin-dts',
          link: 'https://github.com/qmhc/vite-plugin-dts',
        },
        {
          text: 'Fantastic-admin',
          subI18n: t('fantasticAdmin'),
          link: 'https://fantastic-admin.gitee.io/',
        },
        {
          text: 'vue-hooks-plus',
          subI18n: t('hooksLib'),
          link: `https://inhiblabcore.github.io/docs/hooks/${lang !== 'zh-CN' ? 'en/' : ''}`,
        },
        {
          text: 'RedBlues-1980',
          subI18n: t('logoDesign'),
          link: 'https://richuangangban1980.lofter.com/',
        },
      ],
    },
    {
      i18n: t('help'),
      items: [
        {
          text: 'GitHub',
          link: 'https://github.com/vexip-ui/vexip-ui',
        },
        {
          i18n: t('changelog'),
          link: 'https://github.com/vexip-ui/vexip-ui/blob/main/CHANGELOG.md',
        },
        {
          i18n: t('issue'),
          link: 'https://github.com/vexip-ui/vexip-ui/issues',
        },
        {
          i18n: t('contribute'),
          link: 'https://github.com/vexip-ui/vexip-ui/blob/main/CONTRIBUTING.md',
        },
        {
          i18n: t('qqGroup'),
          link: 'https://jq.qq.com/?_wv=1027&k=5KlA84xG',
        },
        {
          i18n: t('sponsor'),
          link:
            lang === 'zh-CN'
              ? '/zh-CN/guide/vexip-ui.html#%E8%B4%A1%E7%8C%AE'
              : '/en-US/guide/vexip-ui.html#contributing',
        },
      ],
    },
  ]
}
