import Breadcrumb from './breadcrumb.vue'

import type { ComponentPublicInstance } from 'vue'

export { Breadcrumb }
export { breadcrumbProps } from './props'

export type BreadcrumbExposed = ComponentPublicInstance & InstanceType<typeof Breadcrumb>

export type { BreadcrumbProps, BreadcrumbCProps } from './props'
export type { BreadcrumbOptions } from './symbol'
