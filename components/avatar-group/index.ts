import AvatarGroup from '../avatar/avatar-group.vue'

import type { ComponentPublicInstance } from 'vue'

export { AvatarGroup }
export { avatarGroupProps } from '../avatar/props'

export type AvatarGroupExposed = ComponentPublicInstance & InstanceType<typeof AvatarGroup>

export type { AvatarGroupProps, AvatarGroupCProps } from '../avatar/props'
