import { computed, inject, provide, getCurrentInstance, onBeforeUnmount } from 'vue'
import { isNull, noop } from '@vexip-ui/utils'
import { FIELD_OPTIONS } from './symbol'

import type { ComponentState } from '@vexip-ui/config'
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
          throw new Error('[Vexip warn] Get value by an invalid path')
        }

        return obj
      }
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
          throw new Error('[Vexip warn] Set value by an invalid path')
        }

        obj[key] = {}
      }

      obj = obj[key]
    }

    obj[lastKey] = value

    return true
  }

  return false
}

const defaultProp = computed(() => '')
const defaultState = computed(() => 'default' as ComponentState)

function getEmptyActions<V = unknown>() {
  return {
    isField: false,
    idFor: defaultProp,
    state: defaultState,
    validateField: noop as FieldOptions['validate'],
    clearField: noop as FieldOptions['clearError'],
    resetField: noop as FieldOptions['reset'],
    getFieldValue: (v => v) as (defaultValue?: V) => V,
    setFieldValue: noop as (value: V, strict?: boolean) => void
  }
}

export function useFieldStore<V = unknown>(onFocus?: () => void) {
  const instance = getCurrentInstance()

  if (!instance) return getEmptyActions<V>()

  const fieldActions = inject(FIELD_OPTIONS, null)

  if (!fieldActions) {
    return getEmptyActions<V>()
  }

  // Block the provided if there are dependencies between control components.
  // e.g. AutoComplete -> Select, ColorPicker -> Input
  provide(FIELD_OPTIONS, null)
  fieldActions.sync(instance)
  onFocus && fieldActions.emitter.on('focus', onFocus)

  onBeforeUnmount(() => {
    fieldActions.unsync(instance)
    onFocus && fieldActions.emitter.off('focus', onFocus)
  })

  function clearField(defaultValue?: V) {
    if (!fieldActions) return

    fieldActions.setValue(defaultValue)
    fieldActions.clearError()
  }

  return {
    isField: true,
    idFor: fieldActions.idFor,
    state: fieldActions.state,
    validateField: fieldActions.validate,
    clearField,
    resetField: fieldActions.reset,
    getFieldValue: fieldActions.getValue as (defaultValue?: V) => V,
    setFieldValue: fieldActions.setValue as (value: V, strict?: boolean) => void
  }
}
