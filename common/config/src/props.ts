import { reactive, computed, watch, provide, inject } from 'vue'
import { has, isNull, isObject, isFunction } from '@vexip-ui/utils'

import type { App, ComputedRef, PropType } from 'vue'

export type PropOptions = Record<string, Record<string, unknown>>

interface PropConfig<T = any> {
  default: T | (() => T),
  isFunc?: boolean,
  static?: boolean,
  validator?: (value: T) => any
}
export const PROVIDED_PROPS = '__vxp-provided-props'

export function configProps(props: Partial<PropOptions>, app?: App) {
  const provideFn = isFunction(app?.provide) ? app!.provide : provide

  provideFn(PROVIDED_PROPS, props)
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
    ) as PropConfig<T[keyof T]>
    const validator = isFunction(propOptions.validator) ? propOptions.validator : null
    const defaultValue = propOptions.default
    const isFunc = propOptions.isFunc || false
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
            return configProps.value[key]!
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

export const booleanProp = {
  type: Boolean,
  default: null
}
