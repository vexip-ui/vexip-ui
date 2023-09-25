import Cascader from './cascader.vue'

import type { ComponentPublicInstance } from 'vue'

export { Cascader }
export { cascaderProps } from './props'

export type CascaderExposed = ComponentPublicInstance & InstanceType<typeof Cascader>

export type { CascaderProps, CascaderCProps } from './props'
export type { CascaderKeyConfig } from './symbol'
