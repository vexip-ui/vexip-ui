import { ref } from 'vue'
import { createI18n } from 'vue-i18n'

import { enUSLocale, registerLocale } from 'vexip-ui'
import { zhCN } from './zh-CN'
import { enUS } from './en-US'

import type { LocaleOptions } from 'vexip-ui'

export * from './helper'

export const langOptions = ['zh-CN', 'en-US'] as const
export const defaultLanguage =
  typeof navigator !== 'undefined'
    ? langOptions.find(l => l === navigator.language) || __ROLLBACK_LANG__
    : __ROLLBACK_LANG__

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLanguage,
  fallbackLocale: __ROLLBACK_LANG__,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export const vexipuiLocale = ref<LocaleOptions>({
  locale: 'zh-CN'
})

registerLocale(enUSLocale())
