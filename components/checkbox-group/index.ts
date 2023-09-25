import CheckboxGroup from '../checkbox/checkbox-group.vue'

import type { ComponentPublicInstance } from 'vue'

export { CheckboxGroup }
export { checkboxGroupProps } from '../checkbox/props'

export type CheckboxGroupExposed = ComponentPublicInstance & InstanceType<typeof CheckboxGroup>

export type { CheckboxGroupProps, CheckboxGroupCProps } from '../checkbox/props'
