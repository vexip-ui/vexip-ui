import type { ClassType, StyleType } from '@vexip-ui/config'

interface IconProps {
  class?: ClassType,
  style?: StyleType,
  scale?: number,
  spin?: boolean | 'in' | 'out',
  pulse?: boolean | 'in' | 'out',
  flip?: 'horizontal' | 'vertical' | 'both'
}

export interface MenuOptions {
  label: string | number,
  name?: string,
  path?: string,
  icon?: Record<string, any>,
  iconProps?: IconProps,
  children?: MenuOptions[]
}
