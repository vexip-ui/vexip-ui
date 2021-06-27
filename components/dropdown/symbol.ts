import type { InjectionKey } from 'vue'

export const SELECT_HANDLER: InjectionKey<(label: string | number) => void> =
  Symbol('SELECT_HANDLER')
