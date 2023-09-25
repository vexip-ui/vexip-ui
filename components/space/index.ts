import Space from './space'

import type { ComponentPublicInstance } from 'vue'

export { Space }
export { spaceProps } from './props'

export type SpaceExposed = ComponentPublicInstance & InstanceType<typeof Space>

export type { SpaceProps, SpaceCProps } from './props'
export type { SpaceAlign, SpaceJustify } from './symbol'
