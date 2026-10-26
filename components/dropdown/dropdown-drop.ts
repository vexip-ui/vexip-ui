import { defineComponent, inject, provide, renderSlot } from 'vue'

import { DROPDOWN_STATE, SELECT_HANDLER } from './symbol'

export default defineComponent({
  setup(_, { slots }) {
    const dropdownState = inject(DROPDOWN_STATE, null)

    dropdownState && provide(SELECT_HANDLER, dropdownState.handleSelect)

    return () => renderSlot(slots, 'default')
  },
})
