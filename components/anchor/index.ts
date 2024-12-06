import Anchor from './anchor.vue'

import type { ComponentPublicInstance } from 'vue'

export { Anchor }
export { anchorProps } from './props'

export type AnchorExposed = ComponentPublicInstance & InstanceType<typeof Anchor>

export type { AnchorProps, AnchorCProps } from './props'
export type { AnchorLinkOptions, AnchorSlots } from './symbol'
