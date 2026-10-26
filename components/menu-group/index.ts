import MenuGroup from '../menu/menu-group'

import type { ComponentPublicInstance } from 'vue'

export { MenuGroup }
export { menuGroupProps } from '../menu/props'

export type MenuGroupExposed = ComponentPublicInstance & InstanceType<typeof MenuGroup>

export type { MenuGroupProps } from '../menu/props'
