import { defineComponent, inject, provide } from 'vue'

import { DROPDOWN_STATE, SELECT_HANDLER } from './symbol'

export default defineComponent({
  setup(_, { slots }) {
    const dropdownState = inject(DROPDOWN_STATE, null)

    provide(SELECT_HANDLER, dropdownState?.handleSelect)

    return () => slots.default?.() ?? null
  }
})
