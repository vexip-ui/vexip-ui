import { reactive, computed, watch, provide, inject, unref } from 'vue'
import { has, isNull, isObject, isFunction, mergeObjects } from '@vexip-ui/utils'

import type { App, ComputedRef, PropType, Ref, CSSProperties } from 'vue'

export type PropsOptions = Record<string, Record<string, unknown>>

type EnsureValue<T> = Exclude<T, undefined | null>
type MaybeRef<T> = T | Ref<T>

interface PropsConfig<T = any> {
  default: T | (() => T) | null,
  isFunc?: boolean,
  static?: boolean,
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

export function configProps(props: Partial<PropsOptions> | Ref<Partial<PropsOptions>>, app?: App) {
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

      return mergeObjects(upstreamProps.value, unref(props))
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

    validator &&
      watch(
        () => sourceProps[key],
        value => {
          const result = validator(value)

          if (result === false) {
            console.warn(
              `${toWarnPrefix(name)}: an invaild value is set to '${key as string}' prop`
            )
          }
        }
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

export type ComponentSize = 'small' | 'default' | 'large'

export const sizeProp = String as PropType<ComponentSize>

export function createSizeProp(defaultValue: MaybeRef<ComponentSize> = 'default') {
  return {
    default: () => unref(defaultValue),
    validator(value: ComponentSize) {
      return ['small', 'default', 'large'].includes(value)
    }
  }
}

export type ComponentState = 'default' | 'success' | 'error' | 'warning'

export const stateProp = String as PropType<ComponentState>

export function createStateProp(defaultValue: MaybeRef<ComponentState> = 'default') {
  return {
    default: () => unref(defaultValue),
    validator(value: ComponentState) {
      return ['default', 'success', 'error', 'warning'].includes(value)
    }
  }
}

type MaybeArray<T> = T | T[]
// type MaybeArrayDeep<T> = T | (MaybeArrayDeep<T>[] extends infer R ? R : never)

export type ClassType = string | Record<string, any> | Array<string | Record<string, any>>
export type StyleType = string | CSSProperties | Array<string | CSSProperties>

export const classProp = [String, Object, Array] as PropType<ClassType>
export const styleProp = [String, Object, Array] as PropType<StyleType>

type AnyFunction = (...args: any[]) => any
type VoidFunction = () => void

const eventTypes = [Function, Array]

export function eventProp<F extends AnyFunction = VoidFunction>() {
  return eventTypes as PropType<MaybeArray<F>>
}

export function emitEvent<A extends any[]>(handlers: MaybeArray<(...args: A) => void>, ...args: A) {
  if (Array.isArray(handlers)) {
    for (let i = 0, len = handlers.length; i < len; ++i) {
      const handler = handlers[i]
      typeof handler === 'function' && handlers[i](...args)
    }
  } else {
    typeof handlers === 'function' && handlers(...args)
  }
}
