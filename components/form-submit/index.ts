import FormSubmit from '../form/form-submit.vue'

import type { ComponentPublicInstance } from 'vue'

export { FormSubmit }
export { formSubmitProps } from '../form/props'

export type FormSubmitExposed = ComponentPublicInstance & InstanceType<typeof FormSubmit>

export type { FormSubmitProps, FormSubmitCProps } from '../form/props'
