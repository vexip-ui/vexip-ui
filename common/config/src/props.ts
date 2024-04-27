import { computed, inject, provide, reactive, unref, watch } from 'vue'

import { has, isFunction, isNull, isObject, mergeObjects } from '@vexip-ui/utils'

import type {
  App,
  CSSProperties,
  ComponentObjectPropsOptions,
  ComputedRef,
  MaybeRef,
  PropType
} from 'vue'
import type { LocaleConfig, LocaleNames } from './locale'
import type { AnyFunction, EnsureValue, Expand, MaybeFunction, VoidFunction } from './types'

export type PropsOptions = Record<string, Record<string, unknown>>

interface PropsConfig<T = any> {
  /**
   * The default value of the prop
   */
  default: T | (() => T) | null,
  /**
   * Whether the prop is a function type
   *
   * @default false
   */
  isFunc?: boolean,
  /**
   * Whether the prop is not configurable
   *
   * @default false
   */
  static?: boolean,
  /**
   * Whether the prop is required
   *
   * @default false
   */
  required?: boolean,
  /**
   * The validator for the prop, decide whether the value of the prop is valid
   *
   * @param value the value of the prop
   */
  validator?: (value: T) => any
}

type PropsConfigOptions<T> = {
  [K in keyof T]?:
  | PropsConfig<EnsureValue<T[K]>>
  | EnsureValue<T[K]>
  | (() => EnsureValue<T[K]>)
  | null
}

export const PROVIDED_PROPS = '__vxp-provided-props'
const eventPropRE = /^on[A-Z]/

/**
 * Provide a props config for under components.
 *
 * @param props props config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configProps<T>(props: MaybeRef<T>, app?: App) {
  if (app) {
    app.provide(
      PROVIDED_PROPS,
      computed(() => unref(props))
    )
  } else {
    const upstreamProps = inject<ComputedRef<Record<string, any>> | null>(PROVIDED_PROPS, null)
    const providedProps = computed(() => {
      if (!upstreamProps?.value) {
        return unref(props)
      }

      return mergeObjects(upstreamProps.value, unref(props) as any)
    })

    provide(PROVIDED_PROPS, providedProps)
  }
}

export function useProps<T extends Record<string, any>>(
  name: string,
  sourceProps: T,
  config: PropsConfigOptions<T> = {}
) {
  const providedProps = inject<ComputedRef<Record<string, PropsConfigOptions<T>>> | null>(
    PROVIDED_PROPS,
    null
  )
  const commonProps = computed<PropsConfigOptions<T>>(() => {
    return providedProps?.value?.default ?? {}
  })
  const configProps = computed<PropsConfigOptions<T>>(() => {
    return providedProps?.value?.[name] ?? {}
  })
  const keys = Object.keys(sourceProps) as Array<keyof T>
  const props: {
    [P in keyof T]?: ComputedRef<T[P]>
  } = {}

  keys.forEach(key => {
    const defs = config[key]
    const propOptions = (
      isObject(defs) && has(defs, 'default') ? defs : { default: defs }
    ) as PropsConfig<T[keyof T]>
    const validator = isFunction(propOptions.validator) ? propOptions.validator : null
    const defaultValue = propOptions.default
    const isFunc = isNull(propOptions.isFunc) ? eventPropRE.test(String(key)) : propOptions.isFunc
    const getValue = (value: PropsConfigOptions<T>[keyof T]) =>
      !isFunc && isFunction(value) ? value() : value
    const getDefault = () =>
      (!isFunc && isFunction(defaultValue) ? defaultValue() : defaultValue) as T[keyof T]

    ;(propOptions.required || validator) &&
      watch(
        () => sourceProps[key],
        value => {
          if (isNull(value)) {
            if (propOptions.required) {
              console.warn(`${toWarnPrefix(name)}: '${key as string}' prop is required but not set`)
            }

            return
          } else if (!validator) {
            return
          }

          const result = validator(value)

          if (result === false) {
            console.warn(
              `${toWarnPrefix(name)}: an invalid value is set to '${key as string}' prop`
            )
          }
        },
        { immediate: true }
      )

    if (propOptions.static) {
      props[key] = computed(() => sourceProps[key] ?? getDefault())
    } else {
      props[key] = computed(() => {
        if (isNull(sourceProps[key])) {
          if (!isNull(configProps.value[key])) {
            return getValue(configProps.value[key])
          }
          if (!isNull(commonProps.value[key])) {
            return getValue(commonProps.value[key])
          }

          return getDefault()
        }

        return sourceProps[key]
      })
    }
  })

  return reactive(props) as {
    [P in keyof T]-?: Exclude<T[P], undefined>
  }
}

export function useHookProps<T extends Record<any, any>>(
  props: T,
  defaults: { [K in keyof T]: T[K] | null }
) {
  const propsWithDefault: { [P in keyof T]?: ComputedRef<T[P]> } = {}

  for (const key of Object.keys(props) as (keyof T)[]) {
    propsWithDefault[key] = computed(() => props[key] ?? defaults[key]!)
  }

  return reactive(propsWithDefault) as {
    [P in keyof T]-?: Exclude<T[P], undefined>
  }
}

function toWarnPrefix(name: string) {
  return `[vexip-ui:${name.charAt(0).toLocaleUpperCase() + name.substring(1)}]`
}

export const booleanProp = {
  type: Boolean,
  default: null
}
export const booleanStringProp = {
  type: [Boolean, String],
  default: null
}
export const booleanNumberProp = {
  type: [Boolean, Number],
  default: null
}

type CommonExcludedProps =
  | 'inherit'
  | 'value'
  | 'checked'
  | 'active'
  | 'visible'
  | 'label'
  | 'options'
  | 'name'
type ExcludeProps<P, E extends string = never, I extends string = never> =
  | Exclude<CommonExcludedProps, I>
  | Exclude<E, I>
  | (P extends I ? never : P extends `on${Capitalize<string>}` ? P : never)
type PostProps<T, E extends string> = Omit<{ [P in keyof T]: MaybeFunction<T[P]> }, E>

/**
 * Create a configurable props
 *
 * @param T the type of import('vue').ExtractPropTypes
 * @param E the props should force exclude
 * @param I the props should force include
 */
export type ConfigurableProps<T, E extends string = never, I extends string = never> = PostProps<
  {
    [P in keyof T]?: P extends I
      ? T[P]
      : P extends `on${Capitalize<string>}`
        ? never
        : T[Exclude<P, CommonExcludedProps | E>]
  },
  ExcludeProps<keyof T, E, I>
>

/* eslint-disable @typescript-eslint/ban-types */
type VexipProps<T> = {
  [P in keyof T]: T[P] extends PropType<infer I>
    ? PropType<I & {}>
    : T[P] extends { type: PropType<infer I> }
      ? PropType<I & {}>
      : T[P]
}
/* eslint-enable */

export function wrapProps<T extends ComponentObjectPropsOptions>(props: T) {
  return Object.freeze(props) as Expand<T>
}

export function buildProps<T extends ComponentObjectPropsOptions>(props: T) {
  const common = {
    inherit: booleanProp
  }

  return Object.freeze({ ...common, ...props }) as Expand<VexipProps<typeof common & T>>
}

export function omitProps<T extends ComponentObjectPropsOptions, K extends keyof T>(
  props: T,
  keys: K[]
): Expand<Omit<T, K>>
export function omitProps<
  T extends ComponentObjectPropsOptions,
  K extends keyof T,
  E extends ComponentObjectPropsOptions
>(props: T, keys: K[], extra: E): Expand<Omit<T, K> & E>
export function omitProps<
  T extends ComponentObjectPropsOptions,
  K extends keyof T,
  E extends ComponentObjectPropsOptions
>(props: T, keys: K[], extra?: E) {
  const omittedKeys = new Set(keys)

  return Object.freeze(
    Object.assign(
      (Object.keys(props) as any[]).reduce((prev, current) => {
        if (!omittedKeys.has(current)) {
          prev[current] = props[current]
        }

        return prev
      }, {}),
      extra || {}
    )
  )
}

export type ComponentSize = 'small' | 'default' | 'large'

export const sizeProp = String as PropType<ComponentSize>
const validSizeValues: ComponentSize[] = ['small', 'default', 'large']
const sizeValidator = (value: ComponentSize) => validSizeValues.includes(value)

export function createSizeProp(defaultValue: MaybeRef<ComponentSize> = 'default') {
  return {
    default: () => unref(defaultValue),
    validator: sizeValidator
  }
}

export type ComponentState = 'default' | 'success' | 'error' | 'warning'

export const stateProp = String as PropType<ComponentState>
const validStateValues: ComponentState[] = ['default', 'success', 'error', 'warning']
const stateValidator = (value: ComponentState) => validStateValues.includes(value)

export function createStateProp(defaultValue: MaybeRef<ComponentState> = 'default') {
  return {
    default: () => unref(defaultValue),
    validator: stateValidator
  }
}

type MaybeArray<T> = T | T[]
// type MaybeArrayDeep<T> = T | (MaybeArrayDeep<T>[] extends infer R ? R : never)

export type ClassType = string | Record<string, any> | Array<string | Record<string, any>>
export type StyleType = string | CSSProperties | Array<string | CSSProperties>

export const classProp = [String, Object, Array] as PropType<ClassType>
export const styleProp = [String, Object, Array] as PropType<StyleType>

type ForceBoolean<T> = true extends T
  ? Exclude<T, boolean> | boolean
  : false extends T
    ? Exclude<T, boolean> | boolean
    : T
type ForceBooleanDeep<T> = T extends unknown ? { [K in keyof T]: ForceBoolean<T[K]> } : never
type SplitAndCombo<T, O = T> = T extends unknown
  ?
    | [T]
    | (SplitAndCombo<Exclude<O, T>> extends infer U extends any[]
      ? U extends U
        ? [ForceBoolean<T | U[number]>]
        : never
      : never)
  : never
type GenerateEvent<T extends any[], Others extends any[], R = any> = T extends unknown
  ? Others extends never
    ? (value: T[0]) => R
    : (value: T[0], ...args: Others) => R
  : never

/**
 * Split and combo the first parameter of the given function
 *
 * @example
 * ```ts
 * // origin function
 * type Fn = (value: string | number | boolean) => void
 *
 * // after transform
 * type After =
 *  | ((value: string | number | boolean) => void)
 *  | ((value: string | number) => void)
 *  | ((value: string | boolean) => void)
 *  | ((value: number | boolean) => void)
 *  | ((value: string) => void)
 *  | ((value: number) => void)
 *  | ((value: boolean) => void)
 * ```
 */
export type EventListener<T extends AnyFunction> =
  Expand<ForceBooleanDeep<SplitAndCombo<Parameters<T>[0]>>> extends infer F extends any[]
    ? Parameters<T> extends [unknown, ...infer Others]
      ? GenerateEvent<F, Others, ReturnType<T>>
      : GenerateEvent<F, never, ReturnType<T>>
    : never

const eventTypes = [Function, Array]

export function eventProp<F extends AnyFunction = VoidFunction>() {
  return eventTypes as PropType<MaybeArray<F>>
}

export function emitEvent<A extends any[]>(
  handlers: MaybeArray<(...args: A) => void> | undefined,
  ...args: A
) {
  if (Array.isArray(handlers)) {
    for (let i = 0, len = handlers.length; i < len; ++i) {
      const handler = handlers[i]

      typeof handler === 'function' && handler(...args)
    }
  } else {
    typeof handlers === 'function' && handlers(...args)
  }
}

export function localeProp<N extends LocaleNames>(_name: N) {
  return Object as PropType<Partial<LocaleConfig[N]>>
}

export const valueProp = {
  type: [String, Number, Boolean],
  default: null
}
export const valuesProp = {
  type: [String, Number, Boolean, Array] as PropType<MaybeArray<string | number | boolean>>,
  default: null
}

export const iconProp = [Object, Function]

export function createIconProp(defaultValue: Record<any, any> | AnyFunction | null = null) {
  return {
    isFunc: true,
    default: defaultValue
  }
}
