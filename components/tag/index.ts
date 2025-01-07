import Tag from './tag'

import type { ComponentPublicInstance } from 'vue'

export { Tag }
export { tagProps } from './props'

export type TagExposed = ComponentPublicInstance & InstanceType<typeof Tag>

export type { TagProps, TagCProps } from './props'
export type { TagState, TagNamedColor, TagType, TagSlots } from './symbol'
