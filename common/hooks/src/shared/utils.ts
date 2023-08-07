import { renderSlot } from 'vue'

import type { Slots } from 'vue'

export function createSlotRender(slots: Slots, names: string[], fallback?: (params?: any) => any) {
  for (const name of names) {
    if (slots[name]) {
      return (params: any) => renderSlot(slots, name, params)
    }
  }

  return fallback || null
}
