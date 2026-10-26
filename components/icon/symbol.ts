import type { ClassType, StyleType } from '@vexip-ui/config'

export type IconPresetEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out'
export type IconEffect = IconPresetEffect | (string & {})

export interface IconBaseProps {
  icon: Record<string, any>,
  class?: ClassType,
  style?: StyleType,
  scale?: number | string,
  title?: string,
  label?: string,
  flip?: 'horizontal' | 'vertical' | 'both',
  effect?: IconEffect,
  size?: string,
  color?: string,
  rotate?: number | string,
}

export type IconRenderer = (
  props: IconBaseProps,
  attrs: Record<string, any>,
  renderDefault: () => any,
) => any

export interface IconProps extends IconBaseProps {
  renderer?: IconRenderer,
}

export type IconMinorProps = Omit<IconProps, 'icon'>
