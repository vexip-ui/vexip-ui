import { defineComponent, inject, provide } from 'vue'
import { SELECT_HANDLER, DROPDOWN_STATE } from './symbol'

export default defineComponent({
  functional: true,
  setup(_, { slots }) {
    const dropdownState = inject(DROPDOWN_STATE, null)

    provide(SELECT_HANDLER, dropdownState?.handleSelect)

    return () => slots.default?.() ?? null
  }
})
