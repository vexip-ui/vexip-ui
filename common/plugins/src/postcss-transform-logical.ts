import type { Declaration } from 'postcss'

export interface TransformLogicalOptions {
  /**
   * Transform `start` to `right`, `end` to `left` if enabled, and will replace the original declaration
   *
   * @default false
   */
  rtl?: boolean,
  /**
   * Whether to replace the original declaration
   *
   * @default false
   */
  replace?: boolean
}

function transformLogical(options: TransformLogicalOptions = {}): import('postcss').Plugin {
  const { rtl = false, replace = false } = options

  const FLOW_BASE = '((?:inline|block))(-((?:start|end)))?'

  const sizeRE = /(((?:min|max))-)?((?:inline|block))-size/i
  const insetRE = new RegExp(`inset-${FLOW_BASE}`, 'i')
  const paddingRE = new RegExp(`padding-${FLOW_BASE}`, 'i')
  const marginRE = new RegExp(`margin-${FLOW_BASE}`, 'i')
  const borderRE = new RegExp(`border-${FLOW_BASE}(-((?:width|style|color)))?`, 'i')
  const radiusRE = /border-((?:start|end)-(?:start|end))-radius/i

  const valueRE = /(?:caption-side|float|clear|text-align)/i

  const sizeProp = {
    inline: 'width',
    block: 'height'
  }
  const inlineBaseProp = rtl
    ? {
        start: 'right',
        end: 'left'
      }
    : {
        start: 'left',
        end: 'right'
      }
  const blockBaseProp = {
    start: 'top',
    end: 'bottom'
  }

  function splitValue(value: string) {
    const values: string[] = []

    let text = ''
    let lastChar = ''
    let bracket = 0

    for (let i = 0, len = value.length; i < len; ++i) {
      const char = value.charAt(i)
      text += char

      if (char === '(') {
        ++bracket
      } else if (char === ')' && bracket > 0) {
        --bracket
      } else if (char === ' ' && lastChar !== ' ' && !bracket) {
        values.push(text.trim())
        text = ''
      }

      lastChar = char
    }

    if ((text = text.trim())) {
      values.push(text)
    }

    return values
  }

  const insert = !replace && !rtl

  function processDecl(decl: Declaration, props: string[], values: string[] = []) {
    for (let i = 0, len = props.length; i < len; ++i) {
      const prop = props[i]
      const value = values[i]

      if (insert || i < len - 1) {
        decl.cloneBefore(value ? { prop, value } : { prop })
      } else {
        decl.replaceWith(decl.clone(value ? { prop, value } : { prop }))
      }
    }
  }

  function createProcess(
    regexp: RegExp,
    process: (matched: RegExpMatchArray, decl: Declaration) => void
  ) {
    return (decl: Declaration) => {
      const matched = decl.prop.match(regexp)

      return !!matched && (process(matched, decl), true)
    }
  }

  const processSize = createProcess(sizeRE, (matched, decl) => {
    const minmax = matched[2] as 'min' | 'max' | undefined
    const boxType = matched[3] as 'inline' | 'block'

    processDecl(decl, [minmax ? `${minmax}-${sizeProp[boxType]}` : sizeProp[boxType]], [decl.value])
  })

  const normalProcess = (
    prefix: 'margin' | 'padding' | null,
    matched: RegExpMatchArray,
    decl: Declaration
  ) => {
    const boxType = matched[1] as 'inline' | 'block'
    const type = matched[3] as 'start' | 'end' | undefined
    const usedPrefix = prefix ? `${prefix}-` : ''
    const prop = boxType === 'inline' ? inlineBaseProp : blockBaseProp

    if (!type) {
      const [start, end] = splitValue(decl.value)

      processDecl(
        decl,
        [`${usedPrefix}${prop.start}`, `${usedPrefix}${prop.end}`],
        [start, end || start]
      )
    } else {
      processDecl(decl, [`${usedPrefix}${prop[type]}`])
    }
  }

  const processInset = createProcess(insetRE, normalProcess.bind(null, null))
  const processPadding = createProcess(paddingRE, normalProcess.bind(null, 'padding'))
  const processMargin = createProcess(marginRE, normalProcess.bind(null, 'margin'))

  const processBorder = createProcess(borderRE, (matched, decl) => {
    const boxType = matched[1] as 'inline' | 'block'
    const type = matched[3] as 'start' | 'end' | undefined
    const unitType = matched[5] as 'width' | 'style' | 'color' | undefined
    const prop = boxType === 'inline' ? inlineBaseProp : blockBaseProp

    if (!type && !unitType) {
      processDecl(decl, [`border-${prop.start}`, `border-${prop.end}`])
    } else if (type && unitType) {
      processDecl(decl, [`border-${prop[type]}-${unitType}`])
    } else if (type) {
      processDecl(decl, [`border-${prop[type]}`])
    } else {
      processDecl(decl, [`border-${prop.start}-${unitType}`, `border-${prop.end}-${unitType}`])
    }
  })

  const radiusProp = rtl
    ? {
        'start-start': 'top-right',
        'start-end': 'top-left',
        'end-end': 'bottom-left',
        'end-start': 'bottom-right'
      }
    : {
        'start-start': 'top-left',
        'start-end': 'top-right',
        'end-end': 'bottom-right',
        'end-start': 'bottom-left'
      }

  const processRadius = createProcess(radiusRE, (matched, decl) => {
    const type = matched[1] as 'start-start' | 'start-end' | 'end-end' | 'end-start'

    processDecl(decl, [`border-${radiusProp[type]}-radius`])
  })

  const logicalValue = {
    ...(rtl
      ? {
          'inline-start': 'right',
          'inline-end': 'left'
        }
      : {
          'inline-start': 'left',
          'inline-end': 'right'
        }),
    'block-start': 'top',
    'block-end': 'bottom'
  }

  const processValue = createProcess(valueRE, (_, decl) => {
    processDecl(
      decl,
      [decl.prop],
      [logicalValue[decl.value.trim() as keyof typeof logicalValue] || decl.value]
    )
  })

  const processes = [
    processSize,
    processInset,
    processPadding,
    processMargin,
    processBorder,
    processRadius,
    processValue
  ]

  return {
    postcssPlugin: 'transform-logical',
    OnceExit(root) {
      root.walkRules(rule => {
        rule.walkDecls(decl => {
          processes.some(process => process(decl))
        })
      })
    }
  }
}

transformLogical.postcss = true

export { transformLogical }
