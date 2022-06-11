import { computed, provide, inject, unref } from 'vue'
import { mergeObjects } from '@vexip-ui/utils'
import { zhCNLocale } from './zh-CN'
import { enUSLocale } from './en-US'

import type { App, ComputedRef, Ref } from 'vue'
import type { LocaleConfig, LocaleNames, LocaleOptions } from './helper'

export * from './helper'
export * from './zh-CN'
export * from './en-US'

export const PROVIDED_LOCALE = '__vxp-provided-locale'

export const globalLocal = computed(() => getDefaultLocaleConfig())

export function getDefaultLocaleConfig(locale?: string) {
  if (!locale) {
    return zhCNLocale()
  }

  switch (locale) {
    case 'en-US': return enUSLocale()
    default: return zhCNLocale()
  }
}

export function configLocale(sourceLocale: LocaleOptions | Ref<LocaleOptions>, app?: App) {
  if (app) {
    const locale = computed(() => {
      const locale = unref(sourceLocale)

      return mergeObjects(getDefaultLocaleConfig(locale.locale), locale, false)
    })

    app.provide(PROVIDED_LOCALE, locale)
  } else {
    const upstreamLocale = inject<ComputedRef<LocaleConfig> | null>(PROVIDED_LOCALE, globalLocal)
    const locale = computed(() => {
      const locale = unref(sourceLocale)
      if (!upstreamLocale?.value) {
        return mergeObjects(getDefaultLocaleConfig(locale.locale), locale)
      }

      return mergeObjects(upstreamLocale.value as any, locale)
    })

    provide(PROVIDED_LOCALE, locale)
  }
}

export function useLocale(): ComputedRef<LocaleConfig> | null
export function useLocale<T extends LocaleNames>(name: T): ComputedRef<LocaleConfig[T]>
export function useLocale<T extends LocaleNames>(name?: T) {
  const locale = inject<ComputedRef<LocaleConfig>>(PROVIDED_LOCALE, globalLocal)

  if (!name) {
    return locale
  }

  return computed(() => locale.value?.[name] ?? {} as LocaleConfig[T])
}

export function getCountWord(wordTemplate: string, count: number) {
  const words = wordTemplate.split('|')

  if (words.length === 1) return `${count} ${wordTemplate}`

  return `${count} ${count > 1 ? words[1].trim() : words[0].trim()}`
}

export function getCountWordOnly(wordTemplate: string, count: number) {
  const words = wordTemplate.split('|')

  if (words.length === 1) return wordTemplate

  return count > 1 ? words[1].trim() : words[0].trim()
}

export function makeSentence(words: string) {
  const locale = useLocale()

  if (!locale?.value) {
    return words
  }

  return !locale.value.wordSpace ? words.replace(/\s+/g, '') : words
}
