import Form from './form.vue'

export { Form }
export type FormExposed = InstanceType<typeof Form>

export * from './helper'
export * from './validator'
export type { FormProps, FormCProps } from './props'
export type { FormLabelAlign, SubmitMethod } from './symbol'
