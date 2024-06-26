import { computed, getCurrentInstance, inject, onBeforeUnmount, provide } from 'vue'

import { isNull, noop } from '@vexip-ui/utils'
import { FIELD_OPTIONS } from './symbol'

import type { ComponentSize, ComponentState } from '@vexip-ui/config'
import type { FieldOptions } from './symbol'

/**
 * 根据路径读取对象中的值 (实现 ?. 的逻辑)
 *
 * @param obj 需要被读取的对象
 * @param path 读取的路径
 * @param strict 是否开启严格模式 (非法路径报错)
 */
export function getValueByPath<T = unknown>(
  obj: Record<string, any>,
  path: string | string[],
  strict = false
): T | null {
  if (!obj || !path) return null

  if (typeof path === 'string') {
    if (path in obj) return obj[path]

    path = path.split('.')
  }

  if (Array.isArray(path) && path.length) {
    const lastKey = path.pop()

    if (!lastKey) return null

    for (let i = 0, len = path.length; i < len; ++i) {
      const key = String(path[i])

      if (!key) break

      obj = obj[key]

      if (isNull(obj)) {
        if (strict) {
          throw new Error('[vexip-ui:Form] Get value by an invalid path')
        }

        return obj
      }
    }

    if (strict && isNull(obj[lastKey])) {
      throw new Error('[vexip-ui:Form] Get value by an invalid path')
    }

    return obj[lastKey]
  }

  return null
}

/**
 * 根据路径设置对象中的值
 *
 * @param obj 需要被设置的对象
 * @param path 设置的路径
 * @param value 需要设置的值
 * @param strict 是否开启严格模式 (非法路径报错)
 */
export function setValueByPath(
  obj: Record<string, any>,
  path: string | string[],
  value: unknown,
  strict = false
): boolean {
  if (!obj || !path) return false

  if (typeof path === 'string') {
    if (path in obj) {
      obj[path] = value

      return true
    }

    path = path.split('.')
  }

  if (Array.isArray(path) && path.length) {
    const lastKey = path.pop()

    if (!lastKey) return false

    for (let i = 0, len = path.length; i < len; ++i) {
      const key = String(path[i])

      if (!key) {
        return false
      }

      if (typeof obj[key] !== 'object') {
        if (strict) {
          throw new Error('[vexip-ui:Form] Set value by an invalid path')
        }

        obj[key] = {}
      }

      obj = obj[key]
    }

    if (strict && typeof obj !== 'object') {
      throw new Error('[vexip-ui:Form] Set value by an invalid path')
    }

    obj[lastKey] = value

    return true
  }

  return false
}

const defaultId = computed(() => undefined as string | undefined)
const defaultState = computed(() => 'default' as ComponentState)
const defaultFalse = computed(() => false)
const defaultSize = computed(() => 'default' as ComponentSize)

/**
 * @internal
 */
export function getNoopFieldStore<V = unknown>() {
  return {
    isField: false,
    idFor: defaultId,
    labelId: defaultId,
    state: defaultState,
    disabled: defaultFalse,
    loading: defaultFalse,
    size: defaultSize,
    validateField: noop as FieldOptions['validate'],
    clearField: noop as FieldOptions['clearError'],
    resetField: noop as FieldOptions['reset'],
    getFieldValue: (v => v) as (defaultValue?: V) => V,
    setFieldValue: noop as (value: V, strict?: boolean) => void
  }
}

/**
 * Create a field store, provide field states and control methods
 *
 * @param onFocus a focus method for focusing when label is clicked
 */
export function useFieldStore<V = unknown>(onFocus?: () => void) {
  const instance = getCurrentInstance()

  if (!instance) return getNoopFieldStore<V>()

  const fieldOptions = inject(FIELD_OPTIONS, null)

  if (!fieldOptions) {
    return getNoopFieldStore<V>()
  }

  // Block the provided if there are dependencies between control components.
  // e.g. AutoComplete -> Select, ColorPicker -> Input
  provide(FIELD_OPTIONS, null!)
  fieldOptions.sync(instance)
  onFocus && fieldOptions.emitter.on('focus', onFocus)

  onBeforeUnmount(() => {
    fieldOptions.unSync(instance)
    onFocus && fieldOptions.emitter.off('focus', onFocus)
  })

  function clearField(defaultValue?: V) {
    if (!fieldOptions) return

    fieldOptions.setValue(defaultValue)
    fieldOptions.clearError()
  }

  return {
    isField: true,
    idFor: fieldOptions.idFor,
    labelId: fieldOptions.labelId,
    state: fieldOptions.state,
    disabled: fieldOptions.disabled,
    loading: fieldOptions.loading,
    size: fieldOptions.size,
    validateField: fieldOptions.validate,
    clearField,
    resetField: fieldOptions.reset,
    getFieldValue: fieldOptions.getValue as (defaultValue?: V) => V,
    setFieldValue: fieldOptions.setValue as (value: V, strict?: boolean) => void
  }
}
