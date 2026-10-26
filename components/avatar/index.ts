import Avatar from './avatar.vue'

import type { ComponentPublicInstance } from 'vue'

export { Avatar }
export { avatarProps } from './props'

export type AvatarExposed = ComponentPublicInstance & InstanceType<typeof Avatar>

export type { AvatarProps, AvatarCProps } from './props'
export type { AvatarObjectFit, AvatarOption, AvatarSlots, AvatarGroupSlots } from './symbol'
