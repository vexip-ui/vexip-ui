import anchor from 'markdown-it-anchor'
import container from 'markdown-it-container'
import tableSort from 'markdown-it-table-sort'

import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'

export function markdownItSetup(md: MarkdownIt) {
  md.use(anchor, { permalink: true, renderPermalink })
    // .use(useLinkTarget)
    .use(tableSort)
    .use(useContainer)
    .use(useCodeWrapper)
    .use(useTableWrapper)
    .use(useTag)
}

function renderPermalink(
  slug: string,
  _opts: anchor.AnchorOptions,
  state: StateCore,
  index: number,
) {
  const [startToken, contentToken] = state.tokens.slice(index, index + 2)

  startToken.attrs = [
    ['class', 'anchor'],
    ['data-anchor', ''],
  ]

  if (startToken.tag !== 'h2' && startToken.tag !== 'h3') return

  const id = decodeURIComponent(slug)

  contentToken.children = [
    Object.assign(new state.Token('', 'span', 1), {
      attrs: [
        ['id', id],
        ['class', 'anchor__title'],
        ['data-level', startToken.tag[1]],
      ],
    }),
    Object.assign(new state.Token('html_block', '', 0), { content: contentToken.content }),
    new state.Token('', 'span', -1),
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', 'anchor__link'],
        ['href', `#${id}`],
      ],
    }),
    Object.assign(new state.Token('html_block', '', 0), { content: '#' }),
    new state.Token('link_close', 'a', -1),
  ]
}

// 为外部链接添加 target 属性
// function useLinkTarget(md: MarkdownIt) {
//   const renderer = md.renderer.rules.link_open

//   md.renderer.rules.link_open = (tokens, index, options, env, self) => {
//     const token = tokens[index]
//     const href = token.attrGet('href')

//     if (href && isExternal(href)) {
//       token.attrSet('target', '_blank')
//       token.attrSet('ref', 'noreferrer')
//     }

//     return (renderer || self.renderToken.bind(self))(tokens, index, options, env, self)
//   }
// }

function useContainer(md: MarkdownIt) {
  md.use(...createAlertContainer('info'))
    .use(...createAlertContainer('warning'))
    .use(...createAlertContainer('error'))
    .use(container, 'v-pre', {
      render(tokens: Token[], index: number) {
        return tokens[index].nesting === 1 ? '<div v-pre>\n' : '</div>\n'
      },
    })
    .use(...createDemoContainer())
}

function createAlertContainer(type: string) {
  return [
    container,
    type,
    {
      render(tokens: Token[], index: number) {
        const token = tokens[index]

        if (token.nesting === 1) {
          const title = token.info.replace(type, '').trim()
          const titleProp = title ? `title="${title}"` : `i18n title="alert.${type}"`

          return `<TipContainer type="${type}" icon ${titleProp}>\n`
        }

        return '</TipContainer>\n'
      },
    },
  ] as const
}

function createDemoContainer() {
  return [
    container,
    'demo',
    {
      render(tokens: Token[], index: number) {
        const token = tokens[index]
        const demoReg = /^demo\s*(.*)$/

        if (token.nesting === 1) {
          const matched = token.info.trim().match(demoReg)
          const params = matched?.[1].trim().split(/\s+/) || []
          const src = params[0]
          const alive = params[1] === 'alive'

          return `<Demo :demos="demos" :codes="codes" src="${src}" :alive="${alive}">\n`
        } else {
          return '</Demo>\n'
        }
      },
    },
  ] as const
}

function useCodeWrapper(md: MarkdownIt) {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const rawCode = fence(...args)

    return `<div class="language-${token.info.trim()}">${rawCode}</div>`
  }
}

function useTableWrapper(md: MarkdownIt) {
  const tableOpen = md.renderer.rules.table_open
  const tableClose = md.renderer.rules.table_close

  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    const result = tableOpen
      ? tableOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)

    return '<div class="md-table">' + result
  }

  md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    const result = tableClose
      ? tableClose(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)

    return result + '</div>'
  }
}

function useTag(md: MarkdownIt) {
  const tagRE = /^==(.*)==/
  const shortcuts: Record<string, (raw: string) => [string, string]> = {
    // deprecated
    d: value => ['error', value || 'deprecated'],
    // since
    s: value => ['warning', `Since v${value}`],
  }

  md.inline.ruler.before('emphasis', 'tag', (state, silent) => {
    if (silent) return false

    const raw = state.src.slice(state.pos, state.posMax)
    const matched = raw.match(tagRE)

    if (!matched) return false

    const token = state.push('tag', 'tag', 0)
    const units = matched[1].split('|')

    if (units[0].startsWith('!')) {
      const key = units[0].slice(1)

      ;[token.info, token.content] = shortcuts[key]?.(units[1]) ?? units
    } else if (units.length > 1) {
      ;[token.info, token.content] = units
    } else {
      token.info = 'default'
      token.content = raw
    }

    token.level = state.level
    state.pos = state.posMax

    return true
  })

  md.renderer.rules.tag = (tokens, index) => {
    const token = tokens[index]
    const { content, info } = token

    return `<ClientOnly><Tag class="docs-tag" type="${info}" simple>${content}</Tag></ClientOnly>`
  }
}
