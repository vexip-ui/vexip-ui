import Icon from './icon'

import type { ComponentPublicInstance } from 'vue'
import type { ClassType, StyleType } from '@vexip-ui/config'
import type { IconProps } from './props'

export { Icon }
export { iconProps } from './props'

export type IconExposed = ComponentPublicInstance & InstanceType<typeof Icon>

export type { IconProps, IconCProps } from './props'
export type { IconEffect, IconBaseProps, IconRenderer } from './symbol'

export type IconMinorProps = Omit<Partial<IconProps>, 'icon'> & {
  class?: ClassType,
  style?: StyleType
}
