import Anchor from './anchor.vue'

export { Anchor }
export { anchorProps } from './props'

export type AnchorExposed = InstanceType<typeof Anchor>

export type { AnchorProps, AnchorCProps } from './props'
export type { AnchorLinkOptions } from './symbol'
