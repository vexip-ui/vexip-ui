import Modal from './modal.vue'

export { Modal }
export { modalProps } from './props'

export type ModalExposed = InstanceType<typeof Modal>

export type { ModalProps, ModalCProps } from './props'
