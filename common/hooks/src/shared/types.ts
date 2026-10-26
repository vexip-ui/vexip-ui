import type { ComponentPublicInstance, MaybeRef } from 'vue'

export type MaybeRefRecord<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

export type MaybeElement = HTMLElement | SVGElement | undefined | null
export type MaybeInstance = MaybeElement | ComponentPublicInstance

export type {
  /** @deprecated Please use `MaybeRef` type from 'vue' to replace it */
  MaybeRef,
}
