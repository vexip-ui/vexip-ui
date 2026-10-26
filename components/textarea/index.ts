import Textarea from './textarea.vue'

import type { ComponentPublicInstance } from 'vue'

export { Textarea }
export { textareaProps } from './props'

export type TextareaExposed = ComponentPublicInstance & InstanceType<typeof Textarea>

export type { TextareaProps, TextareaCProps } from './props'
