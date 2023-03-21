import type { Ref } from 'vue'

export type EnsureValue<T> = Exclude<T, undefined | null>
export type MaybeRef<T> = T | Ref<T>

/**
 * Use to deconstruct advanced types
 */
export type Expand<T> = T extends unknown ? { [K in keyof T]: T[K] } : never

export type AnyFunction = (...args: any[]) => any
export type VoidFunction = () => void

export type MaybeFunction<T> = AnyFunction extends T ? T : T | (() => T)

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
}
