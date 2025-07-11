import Form from './form.vue'

import type { ComponentPublicInstance } from 'vue'

export { Form }
export { formProps } from './props'

export type FormExposed = ComponentPublicInstance & InstanceType<typeof Form>

export * from './helper'
export * from './validator'
export type { FormProps, FormCProps } from './props'
export type { FormLabelAlign, SubmitMethod, FormItemSlots } from './symbol'
