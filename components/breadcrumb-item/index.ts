import BreadcrumbItem from '../breadcrumb/breadcrumb-item.vue'

import type { ComponentPublicInstance } from 'vue'

export { BreadcrumbItem }
export { breadcrumbItemProps } from '../breadcrumb/props'

export type BreadcrumbItemExposed = ComponentPublicInstance & InstanceType<typeof BreadcrumbItem>
export type { BreadcrumbItemProps } from '../breadcrumb/props'
