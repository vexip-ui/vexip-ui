import FormItem from '../form/form-item.vue'

import type { ComponentPublicInstance } from 'vue'

export { FormItem }
export { formItemProps } from '../form/props'

export type FormItemExposed = ComponentPublicInstance & InstanceType<typeof FormItem>

export type { FormItemProps, FormItemCProps } from '../form/props'
