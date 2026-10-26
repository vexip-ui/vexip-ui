import Checkbox from './checkbox.vue'

import type { ComponentPublicInstance } from 'vue'

export { Checkbox }
export { checkboxProps } from './props'

export type CheckboxExposed = ComponentPublicInstance & InstanceType<typeof Checkbox>

export type { CheckboxProps, CheckboxCProps } from './props'
