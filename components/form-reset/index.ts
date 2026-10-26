import FormReset from '../form/form-reset.vue'

import type { ComponentPublicInstance } from 'vue'

export { FormReset }
export { formResetProps } from '../form/props'

export type FormResetExposed = ComponentPublicInstance & InstanceType<typeof FormReset>

export type { FormResetProps, FormResetCProps } from '../form/props'
