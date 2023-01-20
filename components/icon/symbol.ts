import type { ClassType, StyleType } from '@vexip-ui/config'

// eslint-disable-next-line @typescript-eslint/ban-types
export type IconEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out' | (string & {})

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
