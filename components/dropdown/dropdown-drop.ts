import { defineComponent, inject, provide } from 'vue'
import { SELECT_HANDLER, DROP_SELECT_HANDLER } from './symbol'

export default defineComponent({
  functional: true,
  setup(_, { slots }) {
    const parentSelectHandler = inject(SELECT_HANDLER, null)

    provide(DROP_SELECT_HANDLER, parentSelectHandler)

    return () => slots.default?.() ?? null
  }
})
