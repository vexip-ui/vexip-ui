import { ensureArray, isClient, noop, toKebabCase } from '@vexip-ui/utils'

import type * as CSS from 'csstype'

export interface CSSProperties
  extends CSS.Properties<string | number>,
  CSS.PropertiesHyphen<string | number> {
  [x: `--${string}`]: string | number | undefined
}

type Key = string | number | symbol
type MaybeArray<T> = T | T[]

export interface RenderOptions {
  refresh?: boolean,
  minify?: boolean,
  parent?: Element,
  anchor?: string | Element
}

interface Context {
  style: HTMLStyleElement,
  sheet: CSSStyleSheet | null,
  minify: boolean
}

export type StyleConfig = Record<string, CSSProperties>

export type AtRuleConfig = {
  [K in string]: `@${string}` extends K ? MaybeArray<StyleConfig> : never
}

export type CSSConfig = MaybeArray<AtRuleConfig | StyleConfig>

const styleSheets = new Map<Key, Context>()

/**
 * Create a style tag and push the rendering result into it
 *
 * @param key the unique key
 * @param css the CSS config
 * @param options the extra options
 *
 * @returns a function to remove the style tag
 */
export function useCSS(key: Key, css: CSSConfig, options: RenderOptions = {}): () => void {
  if (!isClient) return noop

  let context = styleSheets.get(key)
  let parent: Element | null

  const getAnchor = () => {
    if (typeof options.anchor === 'string') {
      if (parent) {
        return parent.querySelector(options.anchor)
      }

      return null
    } else {
      return options.anchor || null
    }
  }

  if (context) {
    parent = context.style.parentElement

    if (options.refresh) {
      context.style.textContent = render(css, options.minify)
    } else {
      console.warn(`[@vexip-ui/bem-helper] CSS with '${String(key)}' key has been mounted`)
    }

    if (!parent) {
      parent = options.parent || document.head
      parent.insertBefore(context.style, getAnchor())
    }
  } else {
    parent = options.parent || document.head

    const style = document.createElement('style')

    style.textContent = render(css, options.minify)
    parent.insertBefore(style, getAnchor())

    context = {
      style,
      sheet: style.sheet,
      minify: options.minify || false
    }

    styleSheets.set(key, context)
  }

  return () => {
    parent?.removeChild(context!.style)
    styleSheets.delete(key)

    parent = null
  }
}

/**
 * Render the provided CSS config to CSS text
 *
 * @param css the CSS config
 * @param minify whether to minify the text
 *
 * @returns the CSS text result
 */
export function render(css: CSSConfig, minify = false) {
  const configs = Array.isArray(css) ? css : [css]
  const space = minify ? '' : ' '
  const newLine = minify ? '' : '\n'

  let result = ''

  function createStyle(style: StyleConfig, inner = false) {
    const selectors = Object.keys(style)
    const indent = minify ? '' : '  '
    const prefix = inner ? indent : ''

    selectors.forEach(selector => {
      const properties = style[selector]
      const names = Object.keys(properties) as Array<keyof CSSProperties>

      result += `${prefix}${selector}${space}{${newLine}`
      names.forEach(name => {
        result += `${prefix}${indent}${toKebabCase(name)}:${space}${properties[name]};${newLine}`
      })

      if (minify) {
        result = result.substring(0, result.length - 1)
      }

      result += `${prefix}}${newLine}`
    })
  }

  configs.forEach(config => {
    const selectors = Object.keys(config)

    if (!selectors.length) return

    if (selectors[0].startsWith('@')) {
      ;(selectors as `@${string}`[]).forEach(selector => {
        result += `${selector}${space}{${newLine}`
        ensureArray((config as AtRuleConfig)[selector]).forEach(style => createStyle(style, true))
        result += `}${newLine}`
      })
    } else {
      createStyle(config as StyleConfig)
    }
  })

  return minify ? result : result.substring(0, result.length - 1)
}
