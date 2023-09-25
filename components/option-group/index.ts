import OptionGroup from '../option/option-group.vue'

import type { ComponentPublicInstance } from 'vue'

export { OptionGroup }
export { optionGroupProps } from '../option/props'

export type OptionGroupExposed = ComponentPublicInstance & InstanceType<typeof OptionGroup>
export type { OptionGroupProps } from '../option/props'
