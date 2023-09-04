import Modal from './modal.vue'

import type { ComponentPublicInstance } from 'vue'

export { Modal }
export { modalProps } from './props'

export type ModalExposed = ComponentPublicInstance & InstanceType<typeof Modal>

export type { ModalProps, ModalCProps } from './props'
export type { ModalSlotParams } from './symbol'
