import type { ClassHelper } from '@vexip-ui/config'
import type { StyleConfig } from '@vexip-ui/css-render'

export function basisStyle(selector: string, ch: ClassHelper): StyleConfig {
  return {
    [selector]: {
      fontFamily: ch.gv('font-family-base'),
      fontSize: ch.gv('font-size-base'),
      fontVariantNumeric: 'tabular-nums',
      lineHeight: ch.gv('line-height-base'),
      color: ch.gv('content-color-base')
    },
    [`${selector}, ${selector} *, ${selector} *::before, ${selector} *::after`]: {
      boxSizing: 'border-box'
    }
  }
}
