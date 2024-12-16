import Button from './button'

import type { ComponentPublicInstance } from 'vue'

export { Button }
export { buttonProps } from './props'

export type ButtonExposed = ComponentPublicInstance & InstanceType<typeof Button>

export type { ButtonProps, ButtonCProps } from './props'
export type { ButtonType, ButtonAttrType, ButtonSlots } from './symbol'
