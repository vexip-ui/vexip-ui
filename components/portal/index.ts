import Portal from './portal.vue'

import type { ComponentPublicInstance } from 'vue'

export { Portal }
export type PortalExposed = ComponentPublicInstance & InstanceType<typeof Portal>
