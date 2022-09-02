import type { ClassType, StyleType } from '@vexip-ui/config'

export interface IconProps {
  icon: Record<string, any>,
  class?: ClassType,
  style?: StyleType,
  scale?: number,
  spin?: boolean | 'in' | 'out',
  pulse?: boolean | 'in' | 'out',
  flip?: 'horizontal' | 'vertical' | 'both'
}

export type IconMinorProps = Omit<IconProps, 'icon'>
