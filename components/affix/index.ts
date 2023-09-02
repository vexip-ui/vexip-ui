import Affix from './affix.vue'

import type { ComponentPublicInstance } from 'vue'

export { Affix }
export { affixProps } from './props'

export type AffixExposed = ComponentPublicInstance & InstanceType<typeof Affix>

export type { AffixProps, AffixCProps } from './props'
export type { AffixPositionType } from './symbol'
