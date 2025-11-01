import type { InjectionKey } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'

export type AvatarObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
export type AvatarOption = ({ src: string } | { icon: Record<string, any> } | { text: string }) &
  Record<string, any>

export interface AvatarGroupState {
  size: number | ComponentSize,
}

export interface AvatarSlots {
  default?: () => any,
  icon?: () => any,
}

export interface AvatarGroupSlots {
  default?: (params: { option: AvatarOption, index: number }) => any,
  rest?: (params: { options: AvatarOption[], count: number }) => any,
  tip?: (params: { options: AvatarOption[], count: number }) => any,
}

export const GROUP_STATE = '__VXP_AVATAR_GROUP_STATE' as unknown as InjectionKey<AvatarGroupState>

export const objectFitValues = Object.freeze<AvatarObjectFit[]>([
  'fill',
  'contain',
  'cover',
  'none',
  'scale-down',
])
