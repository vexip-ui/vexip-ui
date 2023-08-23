import AnchorLink from '../anchor/anchor-link.vue'

import type { ComponentPublicInstance } from 'vue'

export { AnchorLink }
export { anchorLinkProps } from '../anchor/props'

export type AnchorLinkExposed = ComponentPublicInstance & InstanceType<typeof AnchorLink>
export type { AnchorLinkProps } from '../anchor/props'
