import { reactive, computed, watch, provide, inject, unref } from 'vue'
import { has, isNull, isObject, isFunction, mergeObjects } from '@vexip-ui/utils'

import type { App, ComputedRef, PropType, Ref } from 'vue'

export type PropsOptions = Record<string, Record<string, unknown>>

interface PropsConfig<T = any> {
  default: T | (() => T),
  isFunc?: boolean,
  static?: boolean,
  validator?: (value: T) => any
}
export const PROVIDED_PROPS = '__vxp-provided-props'

export function configProps(props: Partial<PropsOptions> | Ref<Partial<PropsOptions>>, app?: App) {
  if (app) {
    app.provide(PROVIDED_PROPS, computed(() => unref(props)))
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

export function useProps<T>(
  name: string,
  sourceProps: T,
  config: Partial<Record<keyof T, any>> = {}
) {
  const providedProps = inject<ComputedRef<Record<string, Record<keyof T, T[keyof T]>>> | null>(
    PROVIDED_PROPS,
    null
  )
  const configProps = computed(() => {
    return providedProps?.value?.[name] ?? ({} as Record<keyof T, T[keyof T]>)
  })
  const keys = Object.keys(sourceProps) as Array<keyof T>
  const props = {} as Record<keyof T, ComputedRef<T[keyof T]>>

  keys.forEach(key => {
    const defs = config[key]
    const propOptions = (
      isObject(defs) && has(defs, 'default') ? defs : { default: defs }
    ) as PropsConfig<T[keyof T]>
    const validator = isFunction(propOptions.validator) ? propOptions.validator : null
    const defaultValue = propOptions.default
    const isFunc = !!propOptions.isFunc
    const getDefault = () =>
      (!isFunc && isFunction(defaultValue) ? defaultValue() : defaultValue) as T[keyof T]

    validator && watch(() => sourceProps[key], validator)

    if (propOptions.static) {
      props[key] = computed(() => {
        return sourceProps[key] ?? getDefault()
      })
    } else {
      props[key] = computed(() => {
        if (isNull(sourceProps[key])) {
          if (!isNull(configProps.value[key])) {
            const providedValue = configProps.value[key]!

            return !isFunc && isFunction(providedValue) ? providedValue() : providedValue
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

export function createSizeProp() {
  return {
    default: 'default' as ComponentSize,
    validator(value: ComponentSize) {
      return ['small', 'default', 'large'].includes(value)
    }
  }
}

export type ComponentState = 'default' | 'success' | 'error' | 'warning'

export const stateProp = String as PropType<ComponentState>

export function createStateProp() {
  return {
    default: 'default' as ComponentState,
    validator(value: ComponentState) {
      return ['default', 'success', 'error', 'warning'].includes(value)
    }
  }
}
