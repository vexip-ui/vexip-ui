import { reactive, computed, watch, provide, inject } from 'vue'
import { has, isNull, isObject, isFunction } from '@vexip-ui/utils'

import type { App, ComputedRef, PropType } from 'vue'

interface PropOptions<T> {
  default: T | (() => T),
  isFunc?: boolean,
  static?: boolean,
  validator?: (value: T) => any
}

export const PROVIDED_PROPS = '__vxp-provided-props'

export function configProps(props: Record<string, Record<string, unknown>>, app?: App) {
  const provideFn = isFunction(app?.provide) ? app!.provide : provide

  provideFn(PROVIDED_PROPS, props)
}

export function useProps<T, K extends keyof T = keyof T>(
  name: string,
  sourceProps: T,
  defaults: Partial<Record<K, any>> = {}
) {
  const providedProps = inject<ComputedRef<Record<string, Record<K, T[K]>>> | null>(
    PROVIDED_PROPS,
    null
  )
  const configProps = computed(() => {
    return providedProps?.value?.[name] ?? ({} as Record<K, T[K]>)
  })
  const keys = Object.keys(sourceProps) as Array<K>
  const props = {} as Record<K, ComputedRef<T[K]>>

  keys.forEach(key => {
    const defs = defaults[key]
    const propOptions = (
      isObject(defs) && has(defs, 'default') ? defs : { default: defs }
    ) as PropOptions<T[K]>
    const validator = isFunction(propOptions.validator) ? propOptions.validator : null
    const defaultValue = propOptions.default
    const isFunc = propOptions.isFunc || false
    const getDefault = () =>
      (!isFunc && isFunction(defaultValue) ? defaultValue() : defaultValue) as T[K]

    validator && watch(() => sourceProps[key], validator)

    if (propOptions.static) {
      props[key] = computed(() => {
        return isNull(sourceProps[key]) ? getDefault() : sourceProps[key]
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
