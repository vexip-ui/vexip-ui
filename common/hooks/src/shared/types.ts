import type { ComponentPublicInstance, Ref } from 'vue'

export type MaybeRef<T> = Ref<T> | T

export type MaybeRefRecord<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

export type MaybeElement = HTMLElement | SVGElement | undefined | null
export type MaybeInstance = MaybeElement | ComponentPublicInstance
