import { computed, inject, provide, unref } from 'vue'

import { mergeObjects } from '@vexip-ui/utils'
import { zhCNLocale } from './zh-CN'

import type { App, ComputedRef, MaybeRef } from 'vue'
import type { LocaleConfig, LocaleNames, LocaleOptions } from './helper'

export * from './helper'

export * from './de-DE'
export * from './en-US'
export * from './ta-IN'
export * from './zh-CN'
export * from './zh-HK'
export * from './zh-TW'
export * from './ar-EG'

export const PROVIDED_LOCALE = '__vxp-provided-locale'
export const globalLocal = computed(() => zhCNLocale())

const cached = new Map<string, LocaleConfig>()

export function getDefaultLocaleConfig(locale?: string) {
  if (!locale) {
    return globalLocal.value
  }

  return cached.get(locale) || globalLocal.value
}

export function registerLocale(locale: LocaleConfig) {
  locale.locale && cached.set(locale.locale, locale)
}

/**
 * Provide a locale config for under components.
 *
 * @param sourceLocale locale config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configLocale(sourceLocale: MaybeRef<LocaleOptions>, app?: App) {
  if (app) {
    const locale = computed(() => {
      const locale = unref(sourceLocale)

      return mergeObjects(getDefaultLocaleConfig(locale.locale), locale)
    })

    app.provide(PROVIDED_LOCALE, locale)
  } else {
    const upstreamLocale = inject<ComputedRef<LocaleConfig> | null>(PROVIDED_LOCALE, null)
    const locale = computed(() => {
      const locale = unref(sourceLocale)
      // const providedLocale = mergeObjects(getDefaultLocaleConfig(locale.locale), locale)

      if (!upstreamLocale?.value) {
        return mergeObjects(getDefaultLocaleConfig(locale.locale), locale)
      }

      return mergeObjects(upstreamLocale.value as any, locale)
    })

    provide(PROVIDED_LOCALE, locale)
  }
}

export function useLocale(): ComputedRef<LocaleConfig>
export function useLocale<T extends LocaleNames>(name: T): ComputedRef<LocaleConfig[T]>
export function useLocale<T extends LocaleNames>(
  name: T,
  customLocale: MaybeRef<Partial<LocaleConfig[T]>>
): ComputedRef<LocaleConfig[T]>
export function useLocale<T extends LocaleNames>(
  name?: T,
  customLocale?: MaybeRef<Partial<LocaleConfig[T]>>
) {
  const locale = inject<ComputedRef<LocaleConfig>>(PROVIDED_LOCALE, globalLocal)

  if (!name) {
    return locale
  }

  if (customLocale) {
    return computed(() => ({ ...(locale.value?.[name] ?? {}), ...(unref(customLocale) ?? {}) }))
  }

  return computed(() => locale.value?.[name] ?? {})
}

export function useWordSpace() {
  const locale = inject<ComputedRef<LocaleConfig>>(PROVIDED_LOCALE, globalLocal)

  return computed(() => locale.value.wordSpace ?? false)
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

export function makeSentence(words: string, wordSpace = globalLocal.value.wordSpace ?? false) {
  return !wordSpace ? words.replace(/\s+/g, '') : words
}

export function getStepByWord(wordTemplate: string, step: number) {
  return wordTemplate.replace(/{n}/g, `${step}`)
}
