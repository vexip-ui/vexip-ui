import type { Ref, InjectionKey } from 'vue'

export const ROW_GUTTER: InjectionKey<Ref<number | number[]>> = Symbol('ROW_GUTTER')
