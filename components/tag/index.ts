import Tag from './tag'

export { Tag }
export { tagProps } from './props'

export type TagExposed = InstanceType<typeof Tag>

export type { TagProps, TagCProps } from './props'
export type { TagState, TagNamedColor, TagType } from './symbol'
