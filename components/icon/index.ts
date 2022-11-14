import type { ClassType, StyleType } from '@vexip-ui/config'
import type { IconProps } from './props'

export { default as Icon } from './icon'
export type { IconProps, IconCProps } from './props'

export type IconMinorProps = Omit<Partial<IconProps>, 'icon'> & {
  class?: ClassType,
  style?: StyleType
}
