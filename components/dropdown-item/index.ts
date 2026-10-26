import DropdownItem from '../dropdown/dropdown-item.vue'

import type { ComponentPublicInstance } from 'vue'

export { DropdownItem }
export { dropdownItemProps } from '../dropdown/props'

export type DropdownItemExposed = ComponentPublicInstance & InstanceType<typeof DropdownItem>
export type { DropdownItemProps } from '../dropdown/props'
