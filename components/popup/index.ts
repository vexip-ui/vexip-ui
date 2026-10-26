import Popup from './popup.vue'

import type { ComponentPublicInstance } from 'vue'

export { Popup }
export type PopupExposed = ComponentPublicInstance & InstanceType<typeof Popup>

export type { PopupPlacement } from './symbol'
