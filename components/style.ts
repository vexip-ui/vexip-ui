import type { ClassHelper } from '@vexip-ui/config'
import type { StyleConfig } from '@vexip-ui/css-render'

export function basisStyle(selector: string, ch: ClassHelper): StyleConfig {
  return {
    [selector]: {
      fontSize: ch.gv('font-size-base'),
      lineHeight: ch.gv('line-height-base'),
      color: ch.gv('content-color-base'),
      verticalAlign: 'middle'
    },
    [`${selector},${selector} *,${selector} *::before,${selector} *::after`]: {
      boxSizing: 'border-box'
    }
  }
}
