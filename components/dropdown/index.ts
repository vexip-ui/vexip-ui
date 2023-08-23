import Dropdown from './dropdown.vue'

import type { ComponentPublicInstance } from 'vue'

export { Dropdown }
export { dropdownProps } from './props'

export type DropdownExposed = ComponentPublicInstance & InstanceType<typeof Dropdown>

export type { DropdownProps, DropdownCProps } from './props'
export type { DropdownTrigger } from './symbol'
