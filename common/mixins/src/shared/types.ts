import type { Ref } from 'vue'

export type MaybeRef<T> = Ref<T> | T

export type MaybeRefRecord<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}
