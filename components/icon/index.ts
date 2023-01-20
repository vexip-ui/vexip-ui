import Icon from './icon'

import type { ClassType, StyleType } from '@vexip-ui/config'
import type { IconProps } from './props'

export { Icon }
export type IconExposed = InstanceType<typeof Icon>

export type { IconProps, IconCProps } from './props'
export type { IconEffect } from './symbol'

export type IconMinorProps = Omit<Partial<IconProps>, 'icon'> & {
  class?: ClassType,
  style?: StyleType
}
