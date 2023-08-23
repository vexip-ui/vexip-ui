import Affix from './affix.vue'

import type { ComponentPublicInstance } from 'vue'

Affix.name = 'Affix'

export { Affix }
export type AffixExposed = ComponentPublicInstance & InstanceType<typeof Affix>

export type { AffixProps, AffixCProps } from './props'
export type { AffixPositionType } from './symbol'
